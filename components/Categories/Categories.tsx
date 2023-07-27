import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Icon } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import { CATEGORIES } from "@/graphql/queries/categories";
import { CREATE_CATEGORY } from "./graphql/createCategory";
import { UPDATE_CATEGORY } from "./graphql/updateCategory";

import { Input } from "@/ui/Input";
import { Layout } from "@/ui/Layout";
import { Modal } from "@/ui/Modal";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";
import { ButtonDotted } from "@/ui/Button";

import { Container, Box, Title, BtnIcon } from "./Categories.styles";
import { Categories } from "@/types";

const initialState = { new: false, edit: false };

type FormTypes = "new" | "edit";

export function Categories() {
  const [activeForm, setActiveForm] = useState(initialState);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const { loading, error, data } = useQuery<Categories>(CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [CATEGORIES],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [CATEGORIES],
  });

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  const categories = data?.categories;

  function resetState() {
    setActiveForm(initialState);
    setId(0);
    setName("");
  }

  function handleActiveForm(type: FormTypes) {
    setActiveForm({ ...initialState, [type]: true });
  }

  function handleInactiveForm(type: FormTypes) {
    setActiveForm({ ...initialState, [type]: false });
  }

  function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateCategory({ variables: { id, name } });
    resetState();
  }

  function handleNew(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createCategory({ variables: { name } });
    resetState();
  }

  return (
    <Layout>
      <Container>
        {categories?.map((category) => {
          return (
            <Box key={category.id}>
              <Title>{category.name}</Title>
              <BtnIcon
                type="button"
                onClick={() => {
                  setName(category.name);
                  setId(category.id);
                  handleActiveForm("edit");
                }}
              >
                <Icon as={BiEditAlt} fontSize="xl" />
              </BtnIcon>
            </Box>
          );
        })}
      </Container>

      <ButtonDotted
        handleAction={() => {
          setName("");
          handleActiveForm("new");
        }}
        icon={BsPlusCircle}
      >
        Agregar categoría
      </ButtonDotted>

      <Modal
        visible={activeForm.new || activeForm.edit}
        title={activeForm.new ? "Nueva categoría" : "Editar categoría"}
        submitText={activeForm.new ? "Agregar" : "Actualizar"}
        cancelText="Cancelar"
        handleSubmit={activeForm.new ? handleNew : handleEdit}
        handleCancel={() => handleInactiveForm(activeForm.new ? "new" : "edit")}
      >
        <Input
          type="text"
          label="Nombre"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />
      </Modal>
    </Layout>
  );
}

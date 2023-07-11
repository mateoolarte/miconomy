import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Icon } from '@chakra-ui/react';
import { BsPlusCircle } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

import { CATEGORIES } from '../../graphql/queries/categories';
import { CREATE_CATEGORY } from './graphql/createCategory';
import { UPDATE_CATEGORY } from './graphql/updateCategory';

import { Input } from '../../ui/Input';
import { Layout } from '../../ui/Layout';
import { Modal } from '../../ui/Modal';

import {
  Container,
  Box,
  Title,
  BtnIcon,
  AddCategory,
} from './Categories.styles';

const initialState = { new: false, edit: false };

export function Categories(): ReactElement {
  const [activeForm, setActiveForm] = useState(initialState);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const { loading, error, data } = useQuery(CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [CATEGORIES],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [CATEGORIES],
  });

  function resetState() {
    setActiveForm(initialState);
    setId(0);
    setName('');
  }

  function handleActiveForm(type) {
    setActiveForm({ ...initialState, [type]: true });
  }

  function handleInactiveForm(type) {
    setActiveForm({ ...initialState, [type]: false });
  }

  function handleEdit(e) {
    e.preventDefault();

    updateCategory({ variables: { id, name } });
    resetState();
  }

  function handleNew(e) {
    e.preventDefault();

    createCategory({ variables: { name } });
    resetState();
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  return (
    <Layout>
      <Container>
        {data?.categories.map((category) => {
          return (
            <Box key={category.id}>
              <Title>{category.name}</Title>
              <BtnIcon
                type="button"
                onClick={() => {
                  setName(category.name);
                  setId(category.id);
                  handleActiveForm('edit');
                }}
              >
                <Icon as={BiEditAlt} fontSize="xl" />
              </BtnIcon>
            </Box>
          );
        })}
      </Container>

      <AddCategory
        type="button"
        onClick={() => {
          setName('');
          handleActiveForm('new');
        }}
      >
        <Icon as={BsPlusCircle} mr={2} fontSize="lg" />
        Agregar categoría
      </AddCategory>

      <Modal
        visible={activeForm.new || activeForm.edit}
        title={activeForm.new ? 'Nueva categoría' : 'Editar categoría'}
        submitText={activeForm.new ? 'Agregar' : 'Actualizar'}
        cancelText="Cancelar"
        handleSubmit={activeForm.new ? handleNew : handleEdit}
        handleCancel={() => handleInactiveForm(activeForm.new ? 'new' : 'edit')}
      >
        <Input
          type="text"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Modal>
    </Layout>
  );
}

import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { List } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";

import { BUDGET } from "./graphql/budget";
import { CATEGORIES } from "@/graphql/queries/categories";
import { CREATE_CATEGORY_BUDGET } from "./graphql/createCategoryBudget";

import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Modal } from "@/ui/Modal";
import { ButtonDotted } from "@/ui/Button";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";

import { CategoryBudget } from "./CategoryBudget";

import { Budget, Categories, Category } from "@/types";

interface Props {
  budgetCategories: Category[];
  budget: Budget;
}

export function CategoriesBudget({ budgetCategories, budget }: Props) {
  const [activeForm, setActiveForm] = useState(false);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);

  const { loading, error, data } = useQuery<Categories>(CATEGORIES);
  const [createCategoryBudget] = useMutation(CREATE_CATEGORY_BUDGET, {
    refetchQueries: [BUDGET],
  });

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  function resetState() {
    setActiveForm(false);
    setCategory("");
    setValue(0);
  }

  function addCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createCategoryBudget({
      variables: {
        budgetId: Number(budget?.id),
        categoryId: Number(category),
        amount: value,
      },
    });
    resetState();
  }

  const normalizeCategories = data?.categories?.map(
    (category) => category.name,
  );
  const normalizeBudgetCategories = budgetCategories.map(
    (category) => category.name,
  );
  const categoriesWithoutSelection = normalizeCategories?.filter(
    (category) => !normalizeBudgetCategories.includes(category),
  );
  const filteredCategories = data?.categories?.filter(
    (item) => categoriesWithoutSelection?.includes(item.name) || [],
  );

  return (
    <>
      <List>
        {budgetCategories.map((category) => {
          return (
            <CategoryBudget
              key={category.id}
              budget={budget}
              category={category}
            />
          );
        })}
      </List>
      <ButtonDotted
        handleAction={() => setActiveForm(!activeForm)}
        icon={BsPlusCircle}
      >
        Agregar categoría
      </ButtonDotted>

      <Modal
        visible={activeForm}
        title="Agregar categoría"
        submitText="Agregar"
        cancelText="Cancelar"
        handleSubmit={addCategory}
        handleCancel={() => setActiveForm(!activeForm)}
      >
        {filteredCategories && filteredCategories.length > 0 && (
          <Select
            options={filteredCategories.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            emptyOptionText="Seleccione una categoría"
          />
        )}
        <Input
          type="number"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(Number(e.target.value))
          }
        />
      </Modal>
    </>
  );
}

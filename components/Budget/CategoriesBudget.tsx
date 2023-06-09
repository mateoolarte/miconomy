import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Icon, List } from '@chakra-ui/react';
import { BsPlusCircle } from 'react-icons/bs';

import { BUDGET } from './graphql/budget';
import { CATEGORIES } from '../../graphql/web/queries/categories';
import { CREATE_CATEGORY_BUDGET } from './graphql/createCategoryBudget';

import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Modal } from '../../ui/Modal';

import { CategoryBudget } from './CategoryBudget';

import { AddCategory } from './CategoriesBudget.styles';

interface Props {
  budgetCategories: any;
  budget: any;
}

export function CategoriesBudget({
  budgetCategories,
  budget,
}: Props): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);

  const { loading, error, data } = useQuery(CATEGORIES);
  const [createCategoryBudget] = useMutation(CREATE_CATEGORY_BUDGET, {
    refetchQueries: [BUDGET],
  });

  function resetState() {
    setActiveForm(false);
    setCategory('');
    setValue(0);
  }

  function handleNewCategory(e) {
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

  const normalizeCategories = data?.categories.map((category) => category.name);
  const normalizeBudgetCategories = budgetCategories.map(
    (category) => category.name
  );
  const categoriesWithoutSelection = normalizeCategories?.filter(
    (category) => !normalizeBudgetCategories.includes(category)
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

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
      <AddCategory type="button" onClick={() => setActiveForm(!activeForm)}>
        <Icon as={BsPlusCircle} mr={2} fontSize="lg" />
        Agregar categoría
      </AddCategory>

      <Modal
        visible={activeForm}
        title="Agregar categoría"
        submitText="Agregar"
        cancelText="Cancelar"
        handleSubmit={handleNewCategory}
        handleCancel={() => setActiveForm(!activeForm)}
      >
        <Select
          options={data?.categories
            .filter((item) => categoriesWithoutSelection.includes(item.name))
            .map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
          value={category}
          onChange={(value) => setCategory(value)}
          emptyOptionText="Seleccione una categoría"
          emptyOptionValue=""
          defaultValue=""
        />
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </Modal>
    </>
  );
}

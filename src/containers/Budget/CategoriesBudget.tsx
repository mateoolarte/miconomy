import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';

import { BUDGET } from './graphql/budget';
import { CATEGORIES } from '../../graphql/queries/categories';
import { CREATE_CATEGORY_BUDGET } from './graphql/createCategoryBudget';

import { Input } from '../../ui/Input';

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
    <div>
      <ul>
        {budgetCategories.map((category) => {
          return (
            <CategoryBudget
              key={category.id}
              budget={budget}
              category={category}
            />
          );
        })}
      </ul>
      <AddCategory type="button" onClick={() => setActiveForm(!activeForm)}>
        <PlusOutlined />
        Agregar categoría
      </AddCategory>
      {activeForm && (
        <form onSubmit={handleNewCategory}>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Selecciona una categoría</option>
            {data?.categories
              .filter((category) =>
                categoriesWithoutSelection.includes(category.name)
              )
              .map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <button type="button" onClick={() => setActiveForm(!activeForm)}>
            Cancelar
          </button>
          <button type="submit">Agregar categoría</button>
        </form>
      )}
    </div>
  );
}

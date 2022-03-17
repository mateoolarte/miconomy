import { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client';

import { BUDGET } from './graphql/budget';

import { DELETE_CATEGORY_BUDGET } from './graphql/deleteCategoryBudget';
import { UPDATE_CATEGORY_BUDGET } from './graphql/updateCategoryBudget';

import { Input } from '../../ui/Input';

interface Props {
  category: any;
  budget: any;
}

export function CategoryBudget({ category, budget }: Props): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [value, setValue] = useState(0);

  const [deleteCategoryBudget] = useMutation(DELETE_CATEGORY_BUDGET, {
    refetchQueries: [BUDGET],
  });
  const [updateCategoryBudget] = useMutation(UPDATE_CATEGORY_BUDGET, {
    refetchQueries: [BUDGET],
  });

  function resetState() {
    setValue(0);
    setActiveForm(false);
  }

  function handleDeleteCategory(budgetId, categoryId) {
    deleteCategoryBudget({ variables: { budgetId, categoryId } });
  }

  function handleEditCategory(budgetId, categoryId) {
    updateCategoryBudget({
      variables: { budgetId, categoryId, amount: value },
    });
    resetState();
  }

  return (
    <li>
      <h3>{category.name}</h3>
      <p>{category.amount}</p>
      <button
        type="button"
        onClick={() => handleDeleteCategory(budget.id, category.id)}
      >
        Eliminar
      </button>
      <button
        type="button"
        onClick={() => {
          setActiveForm(!activeForm);
          setValue(category.amount);
        }}
      >
        {activeForm ? 'Cancelar' : 'Editar'}
      </button>
      {activeForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditCategory(budget.id, category.id);
          }}
        >
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <button type="submit">Actualizar</button>
        </form>
      )}
    </li>
  );
}

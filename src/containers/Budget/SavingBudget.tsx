import { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client';

import { BUDGET } from './graphql/budget';

import { DELETE_SAVING_BUDGET } from './graphql/deleteSavingBudget';
import { UPDATE_SAVING_BUDGET } from './graphql/updateSavingBudget';

import { Input } from '../../ui/Input';

interface Props {
  saving: any;
  budget: any;
}

export function SavingBudget({ saving, budget }: Props): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [value, setValue] = useState(0);

  const [deleteSavingBudget] = useMutation(DELETE_SAVING_BUDGET, {
    refetchQueries: [BUDGET],
  });
  const [updateSavingBudget] = useMutation(UPDATE_SAVING_BUDGET, {
    refetchQueries: [BUDGET],
  });

  function resetState() {
    setValue(0);
    setActiveForm(false);
  }

  function handleDeleteSaving(budgetId, savingId) {
    deleteSavingBudget({ variables: { budgetId, savingId } });
  }

  function handleEditSaving(budgetId, savingId) {
    updateSavingBudget({
      variables: { budgetId, savingId, fee: value },
    });
    resetState();
  }

  return (
    <li>
      <h3>{saving.name}</h3>
      <p>{saving.fee}</p>
      <button
        type="button"
        onClick={() => handleDeleteSaving(budget.id, saving.id)}
      >
        Eliminar
      </button>
      <button
        type="button"
        onClick={() => {
          setActiveForm(!activeForm);
          setValue(saving.fee);
        }}
      >
        {activeForm ? 'Cancelar' : 'Editar'}
      </button>
      {activeForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSaving(budget.id, saving.id);
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

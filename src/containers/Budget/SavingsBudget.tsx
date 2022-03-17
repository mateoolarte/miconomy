import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { BUDGET } from './graphql/budget';
import { SAVINGS } from '../../graphql/queries/savings';
import { CREATE_SAVING_BUDGET } from './graphql/createSavingBudget';

import { Input } from '../../ui/Input';

import { SavingBudget } from './SavingBudget';

interface Props {
  budgetSavings: any;
  budget: any;
}

export function SavingsBudget({ budgetSavings, budget }: Props): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [saving, setSaving] = useState('');
  const [value, setValue] = useState(0);

  const { loading, error, data } = useQuery(SAVINGS);
  const [createSavingBudget] = useMutation(CREATE_SAVING_BUDGET, {
    refetchQueries: [BUDGET],
  });

  function resetState() {
    setActiveForm(false);
    setSaving('');
    setValue(0);
  }

  function handleNewSaving(e) {
    e.preventDefault();

    createSavingBudget({
      variables: {
        budgetId: Number(budget?.id),
        savingId: Number(saving),
        fee: value,
      },
    });
    resetState();
  }

  const normalizeSavings = data?.savings.map((item) => item.name);
  const normalizeBudgetSavings = budgetSavings.map((item) => item.name);
  const savingsWithoutSelection = normalizeSavings?.filter(
    (item) => !normalizeBudgetSavings.includes(item)
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  return (
    <div>
      <ul>
        {budgetSavings.map((item) => {
          return <SavingBudget key={item.id} budget={budget} saving={item} />;
        })}
      </ul>
      <button type="button" onClick={() => setActiveForm(!activeForm)}>
        Agregar ahorro
      </button>
      {activeForm && (
        <form onSubmit={handleNewSaving}>
          <select onChange={(e) => setSaving(e.target.value)} value={saving}>
            <option value="">Selecciona un ahorro</option>
            {data?.savings
              .filter((item) => savingsWithoutSelection.includes(item.name))
              .map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
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
          <button type="submit">Agregar ahorro</button>
        </form>
      )}
    </div>
  );
}

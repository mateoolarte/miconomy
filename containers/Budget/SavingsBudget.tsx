import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';

import { BUDGET } from './graphql/budget';
import { SAVINGS } from '../../graphql/web/queries/savings';
import { CREATE_SAVING_BUDGET } from './graphql/createSavingBudget';

import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { Select } from '../../ui/Select';

import { SavingBudget } from './SavingBudget';

import { AddSaving } from './SavingBudget.styles';

import { List } from './Budget.styles';

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
    <>
      <List>
        {budgetSavings.map((item) => {
          return <SavingBudget key={item.id} budget={budget} saving={item} />;
        })}
      </List>
      <AddSaving type="button" onClick={() => setActiveForm(!activeForm)}>
        <PlusOutlined />
        Agregar ahorro
      </AddSaving>

      <Modal
        visible={activeForm}
        handleSubmit={handleNewSaving}
        title="Agregar ahorro"
        submitText="Agregar"
        cancelText="Cancelar"
        handleCancel={() => setActiveForm(!activeForm)}
      >
        <Select
          options={data?.savings
            .filter((item) => savingsWithoutSelection.includes(item.name))
            .map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
          value={saving}
          onChange={(value) => setSaving(value)}
          emptyOptionText="Seleccione un ahorro"
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

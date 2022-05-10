import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { BUDGETS } from '../../graphql/queries/budgets';
import { CREATE_BUDGET } from './graphql/createBudget';

import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { Layout } from '../../ui/Layout';

import { AddBudget, BudgetCard, BudgetsContainer } from './Budgets.styles';

export function Budgets(): ReactElement {
  const [activeForm, setActiveForm] = useState(false);
  const [name, setName] = useState('');

  const { loading, error, data } = useQuery(BUDGETS);
  const [createBudget] = useMutation(CREATE_BUDGET, {
    refetchQueries: [BUDGETS],
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  function resetState() {
    setActiveForm(false);
    setName('');
  }

  function handleToggleForm(e) {
    e.preventDefault();

    setActiveForm(!activeForm);
  }

  function handleForm(e) {
    e.preventDefault();

    if (name) {
      createBudget({ variables: { name } });
      resetState();
    }
  }

  return (
    <Layout>
      <BudgetsContainer>
        {data?.budgets.map((budget) => {
          return (
            <Link href={`/budgets/${budget.id}`} passHref key={budget.id}>
              <BudgetCard>
                {budget.name} <ArrowRightOutlined />
              </BudgetCard>
            </Link>
          );
        })}
      </BudgetsContainer>

      <AddBudget type="button" onClick={handleToggleForm}>
        <PlusOutlined />
        Agregar presupuesto
      </AddBudget>

      {activeForm && (
        <Modal
          visible={activeForm}
          title="Agregar presupuesto"
          submitText="Agregar"
          cancelText="Cancelar"
          handleSubmit={handleForm}
          handleCancel={handleToggleForm}
        >
          <Input
            type="text"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Modal>
      )}
    </Layout>
  );
}

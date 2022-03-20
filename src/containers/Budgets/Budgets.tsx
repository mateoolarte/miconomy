import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';

import { BUDGETS } from '../../graphql/queries/budgets';
import { CREATE_BUDGET } from './graphql/createBudget';

import { Input } from '../../ui/Input';

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

    createBudget({ variables: { name } });
    resetState();
  }

  return (
    <section>
      {data?.budgets.map((budget) => {
        return (
          <div key={budget.id}>
            <Link href={`/budgets/${budget.id}`}>
              <a>{budget.name}</a>
            </Link>
          </div>
        );
      })}

      <button type="button" onClick={handleToggleForm}>
        Agregar presupuesto
      </button>

      {activeForm && (
        <div>
          <h3>Agregar presupuesto</h3>
          <form onSubmit={handleForm}>
            <Input
              type="text"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div>
              <button type="button" onClick={handleToggleForm}>
                Cancelar
              </button>
              <button type="submit" disabled={!name}>
                Agregar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

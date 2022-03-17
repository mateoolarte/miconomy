import { ReactElement, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { BUDGET } from './graphql/budget';
import { UPDATE_BUDGET } from './graphql/updateBudget';

import { Input } from '../../ui/Input';

import { CategoriesBudget } from './CategoriesBudget';

const CATEGORIES_TAB = 'categories';
const SAVINGS_TAB = 'savings';

export function Budget(): ReactElement {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('categories');

  const { loading, error, data } = useQuery(BUDGET, {
    variables: { id: Number(id) },
  });
  const [updateBudget] = useMutation(UPDATE_BUDGET, {
    refetchQueries: [BUDGET],
  });

  useEffect(() => {
    setName(data?.budget?.name);
  }, [data]);

  function handleName(e) {
    e.preventDefault();

    updateBudget({ variables: { id: Number(data?.budget?.id), name } });
  }

  function handleTabs(type) {
    setActiveTab(type);
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  return (
    <section>
      <form onSubmit={handleName}>
        <Input
          type="text"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Actualizar</button>
      </form>

      <ul>
        <li>
          <button type="button" onClick={() => handleTabs(CATEGORIES_TAB)}>
            Categorías {activeTab === CATEGORIES_TAB && 'Activo'}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleTabs(SAVINGS_TAB)}>
            Ahorros {activeTab === SAVINGS_TAB && 'Activo'}
          </button>
        </li>
      </ul>

      {activeTab === CATEGORIES_TAB && (
        <CategoriesBudget
          budgetCategories={data?.budget?.categories}
          budget={data?.budget}
        />
      )}
    </section>
  );
}

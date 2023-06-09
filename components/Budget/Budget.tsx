import { ReactElement, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import { BUDGET } from './graphql/budget';
import { UPDATE_BUDGET } from './graphql/updateBudget';

import { Layout } from '../../ui/Layout';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Tabs } from '../../ui/Tabs';

import { CategoriesBudget } from './CategoriesBudget';
import { SavingsBudget } from './SavingsBudget';

export function Budget(): ReactElement {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');

  const { loading, error, data } = useQuery(BUDGET, {
    variables: { id: Number(id) },
  });
  const [updateBudget] = useMutation(UPDATE_BUDGET, {
    refetchQueries: [BUDGET],
  });

  const tabs = [
    {
      key: '1',
      title: 'Categorías',
      content: (
        <CategoriesBudget
          budgetCategories={data?.budget?.categories}
          budget={data?.budget}
        />
      ),
    },
    {
      key: '2',
      title: 'Ahorros',
      content: (
        <SavingsBudget
          budgetSavings={data?.budget?.savings}
          budget={data?.budget}
        />
      ),
    },
  ];

  useEffect(() => {
    setName(data?.budget?.name);
  }, [data]);

  function handleName(e) {
    e.preventDefault();

    updateBudget({ variables: { id: Number(data?.budget?.id), name } });
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  return (
    <Layout>
      <Box as="form" onSubmit={handleName} mb={6}>
        <Input
          type="text"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Box textAlign="center">
          <Button type="submit" disabled={!name} style="primary">
            Actualizar
          </Button>
        </Box>
      </Box>

      <Tabs options={tabs} centered />
    </Layout>
  );
}

import { useState, FormEventHandler } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { ENTRY } from '@/graphql/web/queries/entry';
import { BUDGETS } from '@/graphql/web/queries/budgets';
import { CREATE_ENTRY } from './graphql/createEntry';

import { Select } from '@/ui/Select';
import { Button } from '@/ui/Button';
import { Alert } from '@/ui/Alert';
import { Loading } from '@/ui/Loading';
import { Anchor } from '@/ui/Anchor';

import { EmptyStateCtaContainer } from './Entry.styles';
import { Box, Heading } from '@chakra-ui/react';

interface EmptyStateProps {
  entryId: number | null;
}

export function EmptyState({ entryId }: EmptyStateProps) {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var currentMonth = format(currentDate, 'MMMM', { locale: es });

  const { loading, error, data } = useQuery(BUDGETS, {
    skip: Boolean(entryId),
  });
  const budgets = data?.budgets;
  const hasBudgets = budgets?.length > 0;
  const budgetOptions = budgets?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const [budgetId, setBudgetId] = useState(0);

  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [ENTRY],
  });

  if (entryId) return null;

  function handleEntry(e) {
    e.preventDefault();

    createEntry({ variables: { budgetId, month, year } });
    resetState();
  }

  function resetState() {
    setBudgetId(0);
  }

  if (error) return <h2>Error! {error.message}</h2>;
  if (loading) return <Loading />;

  return (
    <>
      <Alert>
        <p>
          Proximo mes a crear:{' '}
          <strong>
            {currentMonth} {year}
          </strong>
        </p>
      </Alert>

      {!hasBudgets && (
        <Alert status="warning">
          <p>
            No tienes presupuestos creados.{' '}
            <Anchor link="/budgets">Crea uno</Anchor>
          </p>
        </Alert>
      )}

      {hasBudgets && (
        <Box as="form" onSubmit={handleEntry} mt={6}>
          <Select
            options={budgetOptions}
            onChange={(e) => setBudgetId(Number(e.target.value))}
            value={budgetId}
            emptyOptionText="Selecciona un presupuesto"
          />

          <EmptyStateCtaContainer>
            <Button type="submit" fullWidth disabled={budgetId == 0}>
              Crear mes
            </Button>
          </EmptyStateCtaContainer>
        </Box>
      )}
    </>
  );
}

import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

import { BUDGETS } from '../../graphql/queries/budgets';
import { ENTRY } from '../../graphql/queries/entry';
import { CREATE_ENTRY } from './graphql/createEntry';

import { Select } from '../../ui/Select';
import { Layout } from '../../ui/Layout';
import { ButtonLink } from '../../ui/ButtonLink';
import { Button } from '../../ui/Button';

import {
  Heading,
  EmptyBudgetContainer,
  EmptyBudgetTitle,
  EmptyStateDescription,
  EmptyStateCtaContainer,
} from './Entry.styles';

export function Entry(): ReactElement {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const currentMonth = format(currentDate, 'MMMM', { locale: es });

  const { loading, error, data } = useQuery(ENTRY, {
    variables: { month, year },
  });
  const entryId = data?.entry?.id;
  const { data: budgetsData } = useQuery(BUDGETS, { skip: entryId });
  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [ENTRY],
  });

  const [budgetId, setBudgetId] = useState(0);

  const pendingSavings = data?.entry?.savings.filter(
    (item) => !item.sent
  ).length;

  function resetState() {
    setBudgetId(0);
  }

  function handleEntry(e) {
    e.preventDefault();

    createEntry({ variables: { budgetId, month, year } });
    resetState();
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  if (!entryId) {
    return (
      <Layout>
        <Heading>
          Proximo mes a crear
          <p>
            {currentMonth} {year}
          </p>
        </Heading>

        {(!budgetsData?.budgets || budgetsData?.budgets.length === 0) && (
          <EmptyBudgetContainer>
            <EmptyBudgetTitle>
              Aún no has creado ningún presupuesto
            </EmptyBudgetTitle>
            <ButtonLink link="/budgets" fullwidth>
              Haz clic acá para crear uno
            </ButtonLink>
          </EmptyBudgetContainer>
        )}

        {budgetsData?.budgets && budgetsData?.budgets.length > 0 && (
          <form onSubmit={handleEntry}>
            <EmptyStateDescription>
              Selecciona un presupuesto existente
            </EmptyStateDescription>

            <Select
              options={budgetsData.budgets.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(value) => setBudgetId(Number(value))}
              value={budgetId}
              defaultValue={0}
              emptyOptionText="Selecciona un presupuesto"
              emptyOptionValue={0}
            />
            <EmptyStateCtaContainer>
              <Button
                type="submit"
                size="middle"
                style="primary"
                disabled={budgetId === 0}
              >
                Crear mes
              </Button>
            </EmptyStateCtaContainer>
          </form>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>
        Mes actual
        <p>
          {currentMonth} {year}
        </p>
      </Heading>

      <div>
        <h3>Categorías</h3>
        <ul>
          {data?.entry?.categories.map((item) => {
            const totalExpenses = item.expenses.reduce(
              (prev, current) => prev + current.value,
              0
            );
            const lastExpense = item.expenses[item.expenses.length - 1];

            return (
              <li key={item.id}>
                <Link href={`/entry/categories/${item.id}?entryId=${entryId}`}>
                  <a>
                    <h4>{item.name}</h4>
                    <p>Presupuesto: {item.amount}</p>
                    {totalExpenses > 0 && <p>Gasto actual: {totalExpenses}</p>}
                    {lastExpense && (
                      <p>
                        Último gasto: {lastExpense?.description}{' '}
                        {lastExpense?.value}
                      </p>
                    )}
                  </a>
                </Link>
              </li>
            );
          })}

          {data?.entry?.savings.length > 0 && (
            <li>
              <Link href={`/savings`}>
                <a>
                  <h4>Ahorros</h4>
                  {pendingSavings === 0 && (
                    <p>
                      ¡Felicitaciones! Has completado todos los ahorros de este
                      mes
                    </p>
                  )}
                  {pendingSavings > 0 && (
                    <p>
                      Tienes pendiente de enviar {pendingSavings}
                      {pendingSavings > 1 ? ' abonos' : ' abono'}
                    </p>
                  )}
                  {data?.entry?.savings
                    .filter((item) => !item.sent)
                    .map((item) => {
                      return (
                        <p key={item.id}>
                          <strong>
                            {item.name} {item.fee}
                          </strong>
                        </p>
                      );
                    })}
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
}

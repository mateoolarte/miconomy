import { Suspense } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { BALANCE } from './graphql/balance';

import { Title, BalanceContainer, BalanceItem } from './Home.styles';

export function Balance({ entryId }: { entryId: any }) {
  const { error, data } = useSuspenseQuery(BALANCE, {
    variables: { entryId },
  });

  if (error) return <h2>Error! {error.message}</h2>;

  const { expenses, incomes } = data?.balance;

  const totalExpenses = expenses.reduce(
    (prev, current) => prev + current.value,
    0
  );
  const totalIncomes = incomes.reduce(
    (prev, current) => prev + current.value,
    0
  );

  if (totalExpenses == 0 && totalIncomes == 0) return null;

  const available = totalIncomes - totalExpenses;

  return (
    <>
      <Title>Resumen del mes</Title>
      <BalanceContainer>
        <BalanceItem>
          <p>Gastos totales</p> <strong>{totalExpenses}</strong>
        </BalanceItem>
        <BalanceItem>
          <p>Ingresos totales</p> <strong>{totalIncomes}</strong>
        </BalanceItem>
        <BalanceItem fullWidth>
          <p>Disponible</p>
          <strong>{available}</strong>
        </BalanceItem>
      </BalanceContainer>
    </>
  );
}

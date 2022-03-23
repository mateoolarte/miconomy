import { ReactElement, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';

import { ENTRY } from '../../graphql/queries/entry';
import { CREATE_EXPENSE } from '../../graphql/mutations/createExpense';
import { CREATE_INCOME } from '../../graphql/mutations/createIncome';
import { BALANCE } from './graphql/balance';

import { Input } from '../../ui/Input';

export function Home(): ReactElement {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);

  const [categoryId, setCategoryId] = useState(undefined);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');

  const { loading, error, data } = useQuery(ENTRY, {
    variables: { month, year },
  });
  const entryId = data?.entry?.id;
  const {
    loading: balanceLoading,
    error: balanceError,
    data: balanceData,
  } = useQuery(BALANCE, {
    variables: { entryId },
  });
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [ENTRY],
  });
  const [createIncome] = useMutation(CREATE_INCOME, {
    refetchQueries: [ENTRY],
  });

  function resetState() {
    setExpenseForm(false);
    setIncomeForm(false);
    setCategoryId(undefined);
    setValue(0);
    setDescription('');
  }

  function handleExpense(e) {
    e.preventDefault();

    createExpense({ variables: { value, description, entryId, categoryId } });
    resetState();
  }

  function handleIncome(e) {
    e.preventDefault();

    createIncome({ variables: { value, description, entryId } });
    resetState();
  }

  function handleToggleExpense(e) {
    e.preventDefault();

    setExpenseForm(!expenseForm);
  }

  function handleToggleIncome(e) {
    e.preventDefault();

    setIncomeForm(!incomeForm);
  }

  if (loading) return <h2>Loading...</h2>;
  if (balanceLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;
  if (balanceError) return <h2>Error! {balanceError.message}</h2>;

  const totalExpenses = balanceData?.balance?.expenses.reduce(
    (prev, current) => prev + current.value,
    0
  );
  const totalIncomes = balanceData?.balance?.incomes.reduce(
    (prev, current) => prev + current.value,
    0
  );
  const available = totalIncomes - totalExpenses;

  return (
    <section>
      {!entryId && (
        <div>
          <p>Aún no tienes un mes creado, empieza ahora y mide tus gastos</p>
          <Link href="/entry">
            <a>Crear mes</a>
          </Link>
        </div>
      )}

      {entryId && (
        <div>
          {balanceData?.balance && (
            <div>
              <h2>Resumen del mes</h2>
              <p>Gastos totales: {totalExpenses}</p>
              <p>Ingresos totales: {totalIncomes}</p>
              <p>Disponible: {available}</p>
            </div>
          )}

          <h2>¿Que quieres hacer hoy?</h2>
          <button type="button" onClick={handleToggleExpense}>
            Agregar gasto
          </button>
          <button type="button" onClick={handleToggleIncome}>
            Agregar ingreso
          </button>

          {expenseForm && (
            <form onSubmit={handleExpense}>
              <h3>Agregar gasto</h3>
              <select
                onChange={(e) => setCategoryId(Number(e.target.value))}
                value={categoryId}
              >
                <option value="">Selecciona una categoría</option>
                {data?.entry?.categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <Input
                type="number"
                label="Valor"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
              />
              <Input
                type="text"
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button type="submit">Agregar</button>
            </form>
          )}

          {incomeForm && (
            <form onSubmit={handleIncome}>
              <h3>Agregar ingreso</h3>
              <Input
                type="number"
                label="Valor"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
              />
              <Input
                type="text"
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button type="submit">Agregar</button>
            </form>
          )}
        </div>
      )}

      <div>
        <h2>Explora</h2>
        <div>
          <Link href="/entry">
            <a>Mes actual</a>
          </Link>
        </div>
        <div>
          <Link href="/savings">
            <a>Ahorros</a>
          </Link>
        </div>
        <div>
          <Link href="/budgets">
            <a>Presupuestos</a>
          </Link>
        </div>
        <div>
          <Link href="/categories">
            <a>Categorías</a>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

import { BUDGETS } from '../../graphql/queries/budgets';
import { ENTRY } from '../../graphql/queries/entry';
import { CREATE_EXPENSE } from '../../graphql/mutations/createExpense';
import { CREATE_INCOME } from '../../graphql/mutations/createIncome';
import { CREATE_ENTRY } from './graphql/createEntry';

import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Layout } from '../../ui/Layout';

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
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [ENTRY],
  });
  const [createIncome] = useMutation(CREATE_INCOME, {
    refetchQueries: [ENTRY],
  });

  const [budgetId, setBudgetId] = useState(0);
  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const pendingSavings = data?.entry?.savings.filter(
    (item) => !item.sent
  ).length;

  function resetState() {
    setBudgetId(0);
    setExpenseForm(false);
    setIncomeForm(false);
    setValue(0);
    setDescription('');
    setCategoryId(0);
  }

  function handleEntry(e) {
    e.preventDefault();

    createEntry({ variables: { budgetId, month, year } });
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

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  if (!entryId) {
    return (
      <Layout>
        <div>
          Proximo mes a crear {currentMonth} {year}
        </div>

        {budgetsData?.budgets && (
          <form onSubmit={handleEntry}>
            <p>Selecciona un presupuesto existente</p>

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
            <button type="submit">Crear mes</button>
          </form>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        Mes actual {currentMonth} {year}
      </div>
      <div>
        <button type="button" onClick={handleToggleExpense}>
          Crear gasto
        </button>

        <button type="button" onClick={handleToggleIncome}>
          Crear ingreso
        </button>
      </div>

      {expenseForm && (
        <form onSubmit={handleExpense}>
          <h3>Agregar gasto</h3>
          <Select
            options={data?.entry?.categories.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            value={categoryId}
            defaultValue={0}
            emptyOptionText="Selecciona una categoría"
            emptyOptionValue={0}
            onChange={(value) => setCategoryId(Number(value))}
          />
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

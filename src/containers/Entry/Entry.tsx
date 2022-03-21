import { ReactElement, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

import { BUDGETS } from '../../graphql/queries/budgets';
import { ENTRY } from '../../graphql/queries/entry';
import { CREATE_ENTRY } from './graphql/createEntry';
import { CREATE_EXPENSE } from './graphql/createExpense';
import { CREATE_INCOME } from './graphql/createIncome';

import { Input } from '../../ui/Input';

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

  const [budgetId, setBudgetId] = useState(undefined);
  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(undefined);

  const pendingSavings = data?.entry?.savings.filter(
    (item) => !item.sent
  ).length;

  function resetState() {
    setBudgetId(undefined);
    setExpenseForm(false);
    setIncomeForm(false);
    setValue(0);
    setDescription('');
    setCategoryId(undefined);
  }

  function handleBudget(e) {
    e.preventDefault();

    setBudgetId(Number(e.target.value));
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
      <section>
        <div>
          Proximo mes a crear {currentMonth} {year}
        </div>

        <form onSubmit={handleEntry}>
          <p>Selecciona un presupuesto existente</p>
          <select onChange={handleBudget} value={budgetId}>
            <option value="">Selecciona un presupuesto</option>
            {budgetsData?.budgets.map((budget) => {
              return (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Crear mes</button>
        </form>
      </section>
    );
  }

  return (
    <section>
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
                <Link href={`/entry/categories/${item.id}`}>
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
    </section>
  );
}

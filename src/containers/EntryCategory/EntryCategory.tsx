import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';

import { ENTRY_CATEGORY } from './graphql/entryCategory';
import { UPDATE_CATEGORY_ENTRY } from './graphql/updateCategoryEntry';
import { UPDATE_EXPENSE } from './graphql/updateExpense';
import { DELETE_EXPENSE } from './graphql/deleteExpense';

import { Input } from '../../ui/Input';
import { Layout } from '../../ui/Layout';

import { Title } from './EntryCategory.styles';

export function EntryCategory(): ReactElement {
  const router = useRouter();
  const { id, entryId } = router.query;

  const [toggleEditBudget, setToggleEditBudget] = useState(false);
  const [toggleEditExpense, setToggleEditExpense] = useState(false);
  const [toggleDeleteExpense, setToggleDeleteExpense] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [expenseId, setExpenseId] = useState(0);

  const { loading, error, data } = useQuery(ENTRY_CATEGORY, {
    variables: { categoryId: Number(id), entryId: Number(entryId) },
  });
  const [updateCategoryEntry] = useMutation(UPDATE_CATEGORY_ENTRY, {
    refetchQueries: [ENTRY_CATEGORY],
  });
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    refetchQueries: [ENTRY_CATEGORY],
  });
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [ENTRY_CATEGORY],
  });

  const totalExpenses = data?.entryCategory?.expenses.reduce(
    (prev, current) => prev + current.value,
    0
  );

  function resetState() {
    setAmount(0);
    setValue(0);
    setDescription('');
    setToggleEditBudget(false);
    setToggleEditExpense(false);
    setToggleDeleteExpense(false);
  }

  function handleEditBudget(e) {
    e.preventDefault();

    updateCategoryEntry({
      variables: { categoryId: Number(id), entryId: Number(entryId), amount },
    });
    resetState();
  }

  function handleEditExpense(e) {
    e.preventDefault();

    updateExpense({ variables: { value, description, id: expenseId } });
    resetState();
  }

  function handleDeleteExpense(e) {
    e.preventDefault();

    deleteExpense({ variables: { id: expenseId } });
    resetState();
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;

  return (
    <Layout>
      <Title>{data?.entryCategory?.name}</Title>
      <div>
        <p>Presupuesto</p>
        <p>{data?.entryCategory?.amount}</p>
        <button
          type="button"
          onClick={() => {
            setToggleEditBudget(!toggleEditBudget);
            setAmount(data?.entryCategory?.amount);
          }}
        >
          Editar
        </button>
        {toggleEditBudget && (
          <form onSubmit={handleEditBudget}>
            <Input
              type="number"
              label="Valor"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
            <button
              type="button"
              onClick={() => {
                setToggleEditBudget(!toggleEditBudget);
                setAmount(0);
              }}
            >
              Cancelar
            </button>
            <button type="submit">Actualizar</button>
          </form>
        )}
      </div>
      {totalExpenses > 0 && (
        <div>
          <p>Gasto actual</p>
          <p>{totalExpenses}</p>
        </div>
      )}

      {data?.entryCategory?.expenses.length > 0 && (
        <>
          <h2>Gastos</h2>
          <ul>
            {data?.entryCategory?.expenses.map((item) => {
              return (
                <li key={item.id}>
                  <p>{item.description}</p>
                  <p>{item.updatedAt}</p>
                  <p>{item.value}</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setExpenseId(item.id);
                        setValue(item.value);
                        setDescription(item.description);
                        setToggleEditExpense(!toggleEditExpense);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setExpenseId(item.id);
                        setDescription(item.description);
                        setToggleDeleteExpense(!toggleDeleteExpense);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {toggleEditExpense && (
        <form onSubmit={handleEditExpense}>
          <Input
            type="text"
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
          <button
            type="button"
            onClick={() => {
              setExpenseId(0);
              setValue(0);
              setDescription('');
              setToggleEditExpense(!toggleEditExpense);
            }}
          >
            Cancelar
          </button>
          <button type="submit">Actualizar</button>
        </form>
      )}
      {toggleDeleteExpense && (
        <form onSubmit={handleDeleteExpense}>
          <p>¿Estas seguro que deseas eliminar este gasto?</p>
          <h3>{description}</h3>
          <button type="submit">Eliminar</button>
          <button
            type="button"
            onClick={() => {
              setExpenseId(0);
              setDescription('');
              setToggleDeleteExpense(!toggleDeleteExpense);
            }}
          >
            Cancelar
          </button>
        </form>
      )}
    </Layout>
  );
}

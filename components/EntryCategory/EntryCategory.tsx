import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { Icon } from '@chakra-ui/react';
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';

import { ENTRY_CATEGORY } from './graphql/entryCategory';
import { UPDATE_CATEGORY_ENTRY } from './graphql/updateCategoryEntry';
import { UPDATE_EXPENSE } from './graphql/updateExpense';
import { DELETE_EXPENSE } from './graphql/deleteExpense';

import { Input } from '../../ui/Input';
import { Layout } from '../../ui/Layout';
import { Breadcrumb } from '../../ui/Breadcrumb';
import { Modal } from '../../ui/Modal';

import {
  Title,
  DeleteCategory,
  Actions,
  ActionsBox,
  ActionsTitle,
  ActionsValue,
  ActionsBtn,
  Heading,
  List,
  Item,
  ItemTitle,
  ItemDate,
  ItemValue,
  ItemActions,
  ItemBtn,
} from './EntryCategory.styles';

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
      <Breadcrumb
        options={[
          { label: 'Mes actual', path: '/entry' },
          { label: data?.entryCategory?.name, path: '' },
        ]}
      />
      <Title>
        {data?.entryCategory?.name}{' '}
        <DeleteCategory type="button">
          <Icon as={BiTrashAlt} fontSize="md" />
          Eliminar
        </DeleteCategory>
      </Title>
      <Actions>
        <ActionsBox>
          <ActionsTitle>Presupuesto</ActionsTitle>
          <ActionsValue>
            {data?.entryCategory?.amount}
            <ActionsBtn
              type="button"
              onClick={() => {
                setToggleEditBudget(!toggleEditBudget);
                setAmount(data?.entryCategory?.amount);
              }}
            >
              <Icon as={BiEditAlt} fontSize="xl" />
            </ActionsBtn>
          </ActionsValue>

          <Modal
            visible={toggleEditBudget}
            title="Actualizar presupuesto"
            submitText="Actualizar"
            cancelText="Cancelar"
            handleCancel={() => {
              setToggleEditBudget(!toggleEditBudget);
              setAmount(0);
            }}
            handleSubmit={handleEditBudget}
          >
            <Input
              type="number"
              label="Valor"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </Modal>
        </ActionsBox>
        {totalExpenses > 0 && (
          <ActionsBox>
            <ActionsTitle>Gasto actual</ActionsTitle>
            <ActionsValue>{totalExpenses}</ActionsValue>
          </ActionsBox>
        )}
      </Actions>

      {data?.entryCategory?.expenses.length > 0 && (
        <>
          <Heading>Gastos</Heading>
          <List>
            {data?.entryCategory?.expenses.map((item) => {
              return (
                <Item key={item.id}>
                  <ItemTitle>
                    {item.description}
                    <ItemDate>{item.updatedAt}</ItemDate>
                    <ItemValue>-{item.value}</ItemValue>
                  </ItemTitle>

                  <ItemActions>
                    <ItemBtn
                      type="button"
                      onClick={() => {
                        setExpenseId(item.id);
                        setValue(item.value);
                        setDescription(item.description);
                        setToggleEditExpense(!toggleEditExpense);
                      }}
                    >
                      <BiEditAlt />
                    </ItemBtn>
                    <ItemBtn
                      type="button"
                      onClick={() => {
                        setExpenseId(item.id);
                        setDescription(item.description);
                        setToggleDeleteExpense(!toggleDeleteExpense);
                      }}
                    >
                      <BiTrashAlt />
                    </ItemBtn>
                  </ItemActions>
                </Item>
              );
            })}
          </List>
        </>
      )}

      <Modal
        visible={toggleEditExpense}
        title="Editar gasto"
        submitText="Editar"
        cancelText="Cancelar"
        handleCancel={() => {
          setExpenseId(0);
          setValue(0);
          setDescription('');
          setToggleEditExpense(!toggleEditExpense);
        }}
        handleSubmit={handleEditExpense}
      >
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
      </Modal>

      <Modal
        visible={toggleDeleteExpense}
        title="Eliminar gasto"
        submitText="Eliminar"
        cancelText="Cancelar"
        handleCancel={() => {
          setExpenseId(0);
          setDescription('');
          setToggleDeleteExpense(!toggleDeleteExpense);
        }}
        handleSubmit={handleDeleteExpense}
      >
        <p>¿Estas seguro que deseas eliminar este gasto?</p>
        <h3>{description}</h3>
      </Modal>
    </Layout>
  );
}

import { ReactElement, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';

import { ENTRY } from '../../graphql/queries/entry';
import { CREATE_EXPENSE } from '../../graphql/mutations/createExpense';
import { CREATE_INCOME } from '../../graphql/mutations/createIncome';
import { BALANCE } from './graphql/balance';

import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Layout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { ButtonLink } from '../../ui/ButtonLink';

import {
  WalletOutlined,
  CalendarOutlined,
  DollarOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import {
  Heading,
  ExploreContainer,
  Title,
  ExploreOptions,
  ExploreCard,
  ExploreLink,
  BalanceContainer,
  BalanceItem,
  Actions,
} from './Home.styles';

export function Home(): ReactElement {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const options = [
    { id: 1, link: '/entry', label: 'Mes actual', Icon: CalendarOutlined },
    { id: 2, link: '/savings', label: 'Ahorros', Icon: DollarOutlined },
    { id: 3, link: '/budgets', label: 'Presupuestos', Icon: WalletOutlined },
    {
      id: 4,
      link: '/categories',
      label: 'Categorías',
      Icon: UnorderedListOutlined,
    },
  ];

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
    skip: !entryId,
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
    <Layout hideNav>
      {!entryId && (
        <>
          <Heading>
            Aún no tienes un mes creado, empieza ahora y mide tus gastos
          </Heading>
          <ButtonLink link="/entry" fullwidth>
            Crear mes
          </ButtonLink>
        </>
      )}

      {entryId && (
        <>
          {balanceData?.balance && totalExpenses !== 0 && totalIncomes !== 0 && (
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
          )}

          <Title>¿Que quieres hacer hoy?</Title>
          <Actions>
            <Button
              type="button"
              onClick={handleToggleExpense}
              fullWidth
              style="primary"
            >
              Agregar gasto
            </Button>
            <Button
              type="button"
              onClick={handleToggleIncome}
              fullWidth
              style="ghost"
            >
              Agregar ingreso
            </Button>
          </Actions>

          <Modal
            visible={expenseForm}
            title="Agregar gasto"
            submitText="Agregar"
            cancelText="Cancelar"
            handleSubmit={handleExpense}
            handleCancel={() => setExpenseForm(!expenseForm)}
          >
            <Select
              options={data?.entry?.categories.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              emptyOptionText="Selecciona una categoría"
              emptyOptionValue={0}
              value={categoryId}
              defaultValue={0}
              onChange={(value) => setCategoryId(Number(value))}
            />
            <Input
              type="text"
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              type="number"
              label="Valor"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              required
            />
          </Modal>

          <Modal
            visible={incomeForm}
            title="Agregar ingreso"
            submitText="Agregar"
            cancelText="Cancelar"
            handleSubmit={handleIncome}
            handleCancel={() => setIncomeForm(!incomeForm)}
          >
            <Input
              type="text"
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              type="number"
              label="Valor"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              required
            />
          </Modal>
        </>
      )}

      <ExploreContainer>
        <Title>Explora</Title>
        <ExploreOptions>
          {options.map(({ id, link, label, Icon }) => {
            return (
              <ExploreCard key={id}>
                <Link href={link} passHref>
                  <ExploreLink>
                    <Icon />
                    {label}
                  </ExploreLink>
                </Link>
              </ExploreCard>
            );
          })}
        </ExploreOptions>
      </ExploreContainer>
    </Layout>
  );
}

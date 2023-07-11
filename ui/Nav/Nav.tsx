import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import {
  BiHomeAlt,
  BiCalendar,
  BiDollarCircle,
  BiDotsVerticalRounded,
  BiFile,
  BiCreditCard,
  BiPlus,
} from 'react-icons/bi';

import { ENTRY } from '../../graphql/queries/entry';
import { CREATE_EXPENSE } from '../../graphql/mutations/createExpense';
import { CREATE_INCOME } from '../../graphql/mutations/createIncome';

import { Modal } from '../Modal';
import { Input } from '../Input';
import { Select } from '../Select';

import {
  Wrapper,
  List,
  Item,
  ItemPrimary,
  LinkText,
  LinkTextPrimary,
  ItemPrimaryBtn,
  ItemSecondary,
  ItemSecondaryBtn,
  PrimaryActionsList,
  PrimaryActionsItem,
  PrimaryActionsBtn,
  PrimaryActionsText,
  SecondaryActionsLink,
} from './Nav.styles';

export function Nav() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const router = useRouter();
  const currentUrl = router.pathname;

  const [primaryAction, setPrimaryAction] = useState(false);
  const [secondaryAction, setSecondaryAction] = useState(false);

  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);

  const [categoryId, setCategoryId] = useState(0);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');

  const { loading, error, data } = useQuery(ENTRY, {
    variables: { month, year },
  });
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [ENTRY],
  });
  const [createIncome] = useMutation(CREATE_INCOME, {
    refetchQueries: [ENTRY],
  });
  const entryId = data?.entry?.id;

  function resetState() {
    setExpenseForm(false);
    setIncomeForm(false);
    setValue(0);
    setDescription('');
    setCategoryId(0);
  }

  function handleToggleExpense(e) {
    e.preventDefault();

    setExpenseForm(!expenseForm);
    setPrimaryAction(false);
  }

  function handleToggleIncome(e) {
    e.preventDefault();

    setIncomeForm(!incomeForm);
    setPrimaryAction(false);
  }

  function handleExpense() {
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

  return (
    <Wrapper>
      <List>
        <Item isActive={currentUrl === '/'}>
          <Link legacyBehavior href="/">
            <a>
              <Icon as={BiHomeAlt} fontSize="lg" />
              <LinkText>Inicio</LinkText>
            </a>
          </Link>
        </Item>
        <Item isActive={currentUrl === '/entry'}>
          <Link legacyBehavior href="/entry">
            <a>
              <Icon as={BiCalendar} fontSize="lg" />
              <LinkText>Mes actual</LinkText>
            </a>
          </Link>
        </Item>
        <ItemPrimary>
          <Popover>
            <PopoverTrigger>
              <ItemPrimaryBtn type="button" isClosed={primaryAction}>
                <Icon as={BiPlus} rotate={primaryAction ? 45 : 0} />
                <LinkTextPrimary isClosed={primaryAction}>
                  {primaryAction ? 'Cerrar' : 'Agregar'}
                </LinkTextPrimary>
              </ItemPrimaryBtn>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <PrimaryActionsList>
                  <PrimaryActionsItem>
                    <PrimaryActionsBtn
                      type="button"
                      onClick={handleToggleExpense}
                    >
                      <Icon as={BiFile} fontSize="lg" />
                      <PrimaryActionsText>Gasto</PrimaryActionsText>
                    </PrimaryActionsBtn>
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
                  </PrimaryActionsItem>
                  <PrimaryActionsItem>
                    <PrimaryActionsBtn
                      type="button"
                      onClick={handleToggleIncome}
                    >
                      <Icon as={BiCreditCard} fontSize="lg" />
                      <PrimaryActionsText>Ingreso</PrimaryActionsText>
                    </PrimaryActionsBtn>
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
                  </PrimaryActionsItem>
                </PrimaryActionsList>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </ItemPrimary>
        <Item isActive={currentUrl === '/savings'}>
          <Link legacyBehavior href="/savings">
            <a>
              <Icon as={BiDollarCircle} fontSize="lg" />
              <LinkText>Ahorros</LinkText>
            </a>
          </Link>
        </Item>
        <ItemSecondary>
          <Popover>
            <PopoverTrigger>
              <ItemSecondaryBtn type="button">
                <Icon as={BiDotsVerticalRounded} fontSize="lg" />
                <LinkText>Más</LinkText>
              </ItemSecondaryBtn>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <PrimaryActionsList>
                  <PrimaryActionsItem>
                    <Link legacyBehavior href="/categories" passHref>
                      <SecondaryActionsLink
                        isActive={currentUrl === '/categories'}
                      >
                        <Icon as={BiFile} fontSize="lg" />
                        <PrimaryActionsText>Categorías</PrimaryActionsText>
                      </SecondaryActionsLink>
                    </Link>
                  </PrimaryActionsItem>
                  <PrimaryActionsItem>
                    <Link legacyBehavior href="/budgets" passHref>
                      <SecondaryActionsLink
                        isActive={currentUrl === '/budgets'}
                      >
                        <Icon as={BiCreditCard} fontSize="lg" />
                        <PrimaryActionsText>Presupuestos</PrimaryActionsText>
                      </SecondaryActionsLink>
                    </Link>
                  </PrimaryActionsItem>
                </PrimaryActionsList>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </ItemSecondary>
      </List>
    </Wrapper>
  );
}

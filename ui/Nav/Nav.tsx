import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Box,
  Flex,
  Link,
  List,
} from "@chakra-ui/react";
import {
  BiHomeAlt,
  BiCalendar,
  BiDollarCircle,
  BiDotsVerticalRounded,
  BiFile,
  BiCreditCard,
  BiPlus,
} from "react-icons/bi";

import { ENTRY } from "@/graphql/queries/entry";
import { CREATE_EXPENSE } from "@/graphql/mutations/createExpense";
import { CREATE_INCOME } from "@/graphql/mutations/createIncome";

import { Modal } from "../Modal";
import { Input } from "../Input";
import { Select } from "../Select";

export function Nav() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const router = useRouter();
  const currentUrl = router.pathname;

  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);

  const [categoryId, setCategoryId] = useState(0);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");

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
    setDescription("");
    setCategoryId(0);
  }

  function handleToggleExpense(e) {
    e.preventDefault();

    setExpenseForm(!expenseForm);
  }

  function handleToggleIncome(e) {
    e.preventDefault();

    setIncomeForm(!incomeForm);
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

  const itemStyles = (isActive: boolean, type: any = NextLink): any => ({
    as: type,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    alignItems: "center",
    color: isActive ? "blue.500" : "gray.700",
    fontSize: "xs",
    fontWeight: 700,
  });

  const subItemStyles = (type: any = "button"): any => ({
    as: type,
    display: "flex",
    gap: 2,
    py: 2,
    alignItems: "center",
    color: "gray.700",
    fontSize: "sm",
    fontWeight: 700,
  });

  return (
    <Box
      as="nav"
      position="fixed"
      zIndex="1"
      bottom="1rem"
      left="50%"
      transform="translateX(-50%)"
      width="95%"
      boxShadow="base"
      borderRadius="lg"
    >
      <Flex
        as="ul"
        gap={6}
        py={2}
        px={4}
        justifyContent="space-between"
        alignItems="center"
        margin="0"
        listStyleType="none"
      >
        <Box as="li">
          <Link href="/" {...itemStyles(currentUrl === "/")}>
            <Icon as={BiHomeAlt} fontSize="2xl" />
            <Box as="strong">Inicio</Box>
          </Link>
        </Box>
        <Box as="li">
          <Link href="/entry" {...itemStyles(currentUrl === "/entry")}>
            <Icon as={BiCalendar} fontSize="2xl" />
            <Box as="strong">Mes actual</Box>
          </Link>
        </Box>
        <Box as="li">
          <Popover>
            <PopoverTrigger>
              <Flex
                as="button"
                flexDirection="column"
                alignItems="center"
                fontSize="sm"
              >
                <Icon
                  as={BiPlus}
                  fontSize="3xl"
                  borderRadius="full"
                  p={1}
                  backgroundColor="teal.500"
                  color="whiteAlpha.900"
                />
                <Box as="strong" mt={1} color="teal.500">
                  Agregar
                </Box>
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <List>
                  <Box
                    as="li"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                  >
                    <Box {...subItemStyles()} onClick={handleToggleExpense}>
                      <Icon as={BiFile} fontSize="2xl" />
                      <Box as="strong">Gasto</Box>
                    </Box>
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
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
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
                  </Box>
                  <Box as="li">
                    <Box {...subItemStyles()} onClick={handleToggleIncome}>
                      <Icon as={BiCreditCard} fontSize="2xl" />
                      <Box as="strong">Ingreso</Box>
                    </Box>
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
                  </Box>
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Box as="li">
          <Link href="/savings" {...itemStyles(currentUrl === "/savings")}>
            <Icon as={BiDollarCircle} fontSize="2xl" />
            <Box as="strong">Ahorros</Box>
          </Link>
        </Box>
        <Box as="li">
          <Popover>
            <PopoverTrigger>
              <Box type="button" {...itemStyles(false, "button")}>
                <Icon as={BiDotsVerticalRounded} fontSize="2xl" />
                <Box as="strong">Más</Box>
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <List>
                  <Box
                    as="li"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                  >
                    <Link href="/categories" {...subItemStyles(NextLink)}>
                      <Icon as={BiFile} fontSize="2xl" />
                      <Box as="strong">Categorías</Box>
                    </Link>
                  </Box>
                  <Box as="li">
                    <Link href="/budgets" {...subItemStyles(NextLink)}>
                      <Icon as={BiCreditCard} fontSize="2xl" />
                      <Box as="strong">Presupuestos</Box>
                    </Link>
                  </Box>
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
    </Box>
  );
}

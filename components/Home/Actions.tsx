import { useState, MouseEvent } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";

import { CREATE_EXPENSE } from "@/graphql/mutations/createExpense";
import { CREATE_INCOME } from "@/graphql/mutations/createIncome";
import { BALANCE } from "./graphql/balance";

import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";

import { ActionsS } from "./Home.styles";
import { EntryCategory } from "@/types";

interface ActionsProps {
  entryId: number | null;
  categories: EntryCategory[];
}

export function Actions(props: ActionsProps) {
  const { entryId, categories } = props;

  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);

  const [categoryId, setCategoryId] = useState<string | number>("");
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [BALANCE],
  });
  const [createIncome] = useMutation(CREATE_INCOME, {
    refetchQueries: [BALANCE],
  });

  function resetState() {
    setExpenseForm(false);
    setIncomeForm(false);
    setCategoryId("");
    setValue(0);
    setDescription("");
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

  function handleToggleExpense(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setExpenseForm(!expenseForm);
  }

  function handleToggleIncome(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setIncomeForm(!incomeForm);
  }

  return (
    <Box mb={8}>
      <Heading as="h3" size="lg" textAlign="center" mb={4}>
        ¿Que quieres hacer hoy?
      </Heading>

      <ActionsS>
        <Button type="button" onClick={handleToggleExpense} fullWidth>
          Agregar gasto
        </Button>
        <Button
          type="button"
          onClick={handleToggleIncome}
          fullWidth
          variant="outline"
        >
          Agregar ingreso
        </Button>
      </ActionsS>

      <Modal
        visible={expenseForm}
        title="Agregar gasto"
        submitText="Agregar"
        cancelText="Cancelar"
        handleSubmit={handleExpense}
        handleCancel={() => setExpenseForm(!expenseForm)}
      >
        <Select
          options={categories.map((item) => ({
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
  );
}

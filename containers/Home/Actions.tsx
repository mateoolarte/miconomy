"use client"

import { useState, MouseEvent } from 'react';

import { useMutation } from '@apollo/client';

import { ENTRY } from '@/graphql/web/queries/entry';
import { CREATE_EXPENSE } from '@/graphql/web/mutations/createExpense';
import { CREATE_INCOME } from '@/graphql/web/mutations/createIncome';

import { Button } from '@/ui/Button';
import { Modal } from '@/ui/Modal';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';

import { Title, ActionsS } from './Home.styles';

export function Actions({
  entryId,
  categories,
}: {
  entryId: any;
  categories: any;
}) {
  const [expenseForm, setExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);

  const [categoryId, setCategoryId] = useState(undefined);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');

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

  function handleToggleExpense(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setExpenseForm(!expenseForm);
  }

  function handleToggleIncome(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setIncomeForm(!incomeForm);
  }

  return (
    <>
      <Title>¿Que quieres hacer hoy?</Title>

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
  );
}

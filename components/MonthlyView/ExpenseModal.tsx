import { ReactElement, useState } from 'react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';

export interface ExpenseModalProps {
  toggleExpenseModal: boolean;
  setToggleExpenseModal: any;
}

const categories = [
  {
    id: 1,
    label: 'Entretenimiento',
    value: 'entretenimiento',
  },
  {
    id: 2,
    label: 'Comida',
    value: 'comida',
  },
  {
    id: 3,
    label: 'Viajes',
    value: 'viajes',
  },
];

const items = [
  {
    id: 1,
    label: 'Gasolina',
    value: 'gasolina',
  },
  {
    id: 2,
    label: 'Almuerzo',
    value: 'almuerzo',
  },
];

export default function ExpenseModal({
  toggleExpenseModal,
  setToggleExpenseModal,
}: ExpenseModalProps): ReactElement {
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');

  function resetState() {
    setToggleExpenseModal(false);
    setCategory('');
    setItem('');
    setValue(0);
    setDescription('');
  }

  function handleExpense(e) {
    e.preventDefault();

    resetState();
  }

  return (
    <Modal
      isActive={toggleExpenseModal}
      handleClose={() => setToggleExpenseModal(false)}
    >
      <form onSubmit={handleExpense}>
        <h3 className="text-center font-semibold mb-4">Agregar gasto</h3>
        <Select
          value={category}
          options={categories}
          onBlur={e => setCategory(e.target.value)}
          required
        />

        {category && (
          <Select
            value={item}
            options={items}
            onBlur={e => setItem(e.target.value)}
            required
          />
        )}

        {category && item && (
          <>
            <Input
              type="number"
              label="Valor"
              value={value}
              errorMessage=""
              onChange={e => setValue(e.target.value)}
              required
            />
            <Textarea
              label="Descripción"
              value={description}
              required
              onChange={e => setDescription(e.target.value)}
            />
          </>
        )}

        <div className="text-center">
          <Button
            type="submit"
            color="green"
            size="medium"
            disabled={!category || !item || !value || !description}
          >
            Agregar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

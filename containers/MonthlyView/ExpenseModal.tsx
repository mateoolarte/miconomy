import { ReactElement, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_EXPENSE } from './graphql/addExpense';

import { useGetUserMonthCategories } from './hooks/useGetUserMonthCategories';

import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';

interface Props {
  toggleExpenseModal: boolean;
  setToggleExpenseModal: any;
  userMonthId: number;
}

export default function ExpenseModal({
  toggleExpenseModal,
  setToggleExpenseModal,
  userMonthId,
}: Props): ReactElement {
  const { loading, error, data } = useGetUserMonthCategories(userMonthId);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [categoryId, setCategory] = useState(null);
  const [itemId, setItem] = useState(null);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const isValid =
    !categoryId || !itemId || !value || !description || errors['description'];

  const [addExpense] = useMutation(ADD_EXPENSE);

  useEffect(() => {
    const parsedCategories = data?.map((item) => {
      return {
        id: item.id,
        label: item.category.name,
        value: item.id,
      };
    });

    setCategories(parsedCategories || []);
  }, [data]);

  function resetState() {
    setToggleExpenseModal(false);
    setCategory('');
    setItem('');
    setValue(0);
    setDescription('');
    setErrors({});
  }

  function handleCategories(e) {
    const value = Number(e.target.value);

    setCategory(value);

    const getCategoryItems = data?.find((item) => item.id === value)?.items;
    const parsedItems = getCategoryItems?.map((item) => {
      return {
        id: item.id,
        label: item.description,
        value: item.id,
      };
    });

    setItems(parsedItems || []);
  }

  function handleItem(e) {
    const value = Number(e.target.value);

    setItem(value);
  }

  function handleValue(e) {
    const value = Number(e.target.value);

    if (value <= 0) {
      setErrors({
        ...errors,
        value: 'El valor debe ser mayor a cero',
      });
    }

    if (value > 0) {
      setErrors({
        ...errors,
        value: '',
      });
    }

    setValue(value);
  }

  function handleDescription(e) {
    const value = e.target.value;

    if (value.length <= 3) {
      setErrors({
        ...errors,
        description: 'La descripción debe tener más de 3 caracteres',
      });
    }

    if (value.length > 3) {
      setErrors({
        ...errors,
        description: '',
      });
    }

    setDescription(value);
  }

  function handleExpense(e) {
    e.preventDefault();

    addExpense({ variables: { itemId, value, description } });

    resetState();
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Modal
      isActive={toggleExpenseModal}
      handleClose={() => setToggleExpenseModal(false)}
    >
      <form onSubmit={handleExpense}>
        <h3 className="text-center font-semibold mb-4">Agregar gasto</h3>
        <Select
          value={categoryId}
          options={categories}
          onChange={handleCategories}
          defaultOption="Selecciona una categoría"
          required
        />

        {categoryId && (
          <Select
            value={itemId}
            options={items}
            onChange={handleItem}
            defaultOption="Selecciona un item"
            required
          />
        )}

        {categoryId && itemId && (
          <>
            <Input
              type="number"
              label="Valor"
              value={value}
              errorMessage={errors['value']}
              onChange={handleValue}
              required
            />
            <Textarea
              label="Descripción"
              value={description}
              errorMessage={errors['description']}
              required
              onChange={handleDescription}
            />
          </>
        )}

        <div className="text-center">
          <Button type="submit" color="green" size="medium" disabled={isValid}>
            Agregar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

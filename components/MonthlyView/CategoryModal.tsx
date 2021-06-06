import { ReactElement, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_CATEGORY } from '../../graphql/mutations/addCategory';
import { ADD_USER_MONTH_CATEGORY } from './graphql/addUserMonthCategory';

import { useGetUserCategories } from '../../hooks/useGetUserCategories';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export interface CategoryModalProps {
  toggleCategoryModal: boolean;
  setToggleCategoryModal: any;
  userMonthId: number;
}

export default function CategoryModal({
  toggleCategoryModal,
  setToggleCategoryModal,
  userMonthId,
}: CategoryModalProps): ReactElement {
  const { loading, error, data } = useGetUserCategories();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [toggleNewCategory, setToggleNewCategory] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [errors, setErrors] = useState({});

  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted(data) {
      const dataNewCategory = data?.addCategory;

      setCategories([
        ...categories,
        {
          id: dataNewCategory.id,
          value: dataNewCategory.id,
          label: dataNewCategory.name,
        },
      ]);
      setCategoryId(dataNewCategory.id);
      setToggleNewCategory(false);
    },
  });
  const [addUserMonthCategory] = useMutation(ADD_USER_MONTH_CATEGORY, {
    onCompleted() {
      resetState();
    },
  });

  useEffect(() => {
    const parsedCategories = data?.categories?.map(item => {
      return {
        id: item.id,
        label: item.name,
        value: item.id,
      };
    });
    setCategories(parsedCategories || []);
  }, [data]);

  function resetState() {
    setToggleCategoryModal(false);
    setCategoryId(null);
    setToggleNewCategory(false);
    setNewCategoryValue('');
  }

  function handleSelectCategory(e) {
    const value = Number(e.target.value);

    setCategoryId(value);
  }

  function handleNewCategoryValue(e) {
    const value = e.target.value;

    if (value.length <= 3) {
      setErrors({
        ...errors,
        newCategoryValue: 'El valor debe tener más de 3 caracteres',
      });
    }

    if (value.length > 3) {
      setErrors({
        ...errors,
        newCategoryValue: '',
      });
    }

    setNewCategoryValue(value);
  }

  function handleCategory(e) {
    e.preventDefault();

    addUserMonthCategory({ variables: { categoryId, userMonthId } });
  }

  function handleNewCategory(e) {
    e.preventDefault();

    addCategory({ variables: { name: newCategoryValue } });
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Modal
      isActive={toggleCategoryModal}
      handleClose={() => setToggleCategoryModal(false)}
    >
      <form onSubmit={handleCategory}>
        <h3 className="text-center font-semibold mb-4">Agregar categoría</h3>
        <Select
          value={categoryId}
          options={categories}
          defaultOption="Selecciona una categoría"
          onChange={handleSelectCategory}
          required
        />

        {!toggleNewCategory && (
          <div className="mb-6 text-center">
            <p className="mb-2">¿Deseas crear una nueva categoría?</p>
            <Button
              type="button"
              color="blue"
              size="small"
              onClick={() => setToggleNewCategory(true)}
            >
              Crear categoría
            </Button>
          </div>
        )}

        {toggleNewCategory && (
          <div className="flex items-end justify-between max-w-full lg:max-w-xs lg:mx-auto">
            <Input
              type="text"
              label="Nueva categoría"
              value={newCategoryValue}
              errorMessage={errors['newCategoryValue']}
              className="w-11/12 mr-4 lg:w-auto"
              onChange={handleNewCategoryValue}
            />
            <Button
              type="button"
              color="blue"
              size="small"
              className="mb-5"
              onClick={handleNewCategory}
            >
              Crear
            </Button>
          </div>
        )}

        <div className="text-center">
          <Button
            type="submit"
            color="green"
            size="medium"
            disabled={!categoryId}
          >
            Agregar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

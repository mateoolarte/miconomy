import { ReactElement, useState } from 'react';

import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export interface CategoryModalProps {
  toggleCategoryModal: boolean;
  setToggleCategoryModal: any;
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

export default function CategoryModal({
  toggleCategoryModal,
  setToggleCategoryModal,
}: CategoryModalProps): ReactElement {
  const [category, setCategory] = useState('');
  const [toggleNewCategory, setToggleNewCategory] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState('');

  function resetState() {
    setToggleCategoryModal(false);
    setCategory('');
    setToggleNewCategory(false);
    setNewCategoryValue('');
  }

  function handleIncome(e) {
    e.preventDefault();

    resetState();
  }

  function handleNewCategory(e) {
    e.preventDefault();

    setToggleNewCategory(false);
  }

  return (
    <Modal
      isActive={toggleCategoryModal}
      handleClose={() => setToggleCategoryModal(false)}
    >
      <form onSubmit={handleIncome}>
        <h3 className="text-center font-semibold mb-4">Agregar categoría</h3>
        <Select
          value={category}
          options={categories}
          onBlur={e => setCategory(e.target.value)}
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
              errorMessage=""
              className="w-11/12 mr-4 lg:w-auto"
              onChange={e => setNewCategoryValue(e.target.value)}
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
            disabled={category === ''}
          >
            Agregar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

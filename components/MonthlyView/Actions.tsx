import { ReactElement, useState } from 'react';

import Button from '../ui/Button';
import IncomeModal from './IncomeModal';
import CategoryModal from './CategoryModal';

export default function Actions(): ReactElement {
  const [toggleIncomeModal, setToggleIncomeModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [toggleExpenseModal, setToggleExpenseModal] = useState(false);

  const buttons = [
    {
      id: 1,
      title: 'Agregar ingreso',
      onClick: handleOpenIncome,
    },
    {
      id: 2,
      title: 'Agregar categoría',
      onClick: handleOpenCategory,
    },
    {
      id: 3,
      title: 'Agregar gasto',
      onClick: handleOpenExpense,
    },
  ];

  function handleOpenIncome() {
    setToggleIncomeModal(true);
  }

  function handleOpenCategory() {
    setToggleCategoryModal(true);
  }

  function handleOpenExpense() {
    setToggleExpenseModal(true);
  }

  return (
    <div className="flex flex-wrap mb-4">
      <IncomeModal
        toggleIncomeModal={toggleIncomeModal}
        setToggleIncomeModal={setToggleIncomeModal}
      />
      <CategoryModal
        toggleCategoryModal={toggleCategoryModal}
        setToggleCategoryModal={setToggleCategoryModal}
      />
      <p className="mb-2 w-full">Acciones</p>
      {buttons.map(({ id, title, onClick }) => (
        <Button
          key={id}
          type="button"
          onClick={onClick}
          color="blue"
          size="small"
          fullWidth
          className="mb-2 md:mb-0 md:mr-2 md:w-auto"
        >
          {title}
        </Button>
      ))}
    </div>
  );
}

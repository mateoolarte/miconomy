import { ReactElement, useState } from 'react';

import Button from '../../components/ui/Button';
import IncomeModal from './IncomeModal';
import CategoryModal from './CategoryModal';
import ExpenseModal from './ExpenseModal';

interface Props {
  userMonthId: number;
}

export default function Actions({ userMonthId }: Props): ReactElement {
  const [toggleIncomeModal, setToggleIncomeModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [toggleExpenseModal, setToggleExpenseModal] = useState(false);

  const buttons = [
    {
      id: 1,
      title: 'Agregar gasto',
      onClick: handleOpenExpense,
    },
    {
      id: 2,
      title: 'Agregar ingreso',
      onClick: handleOpenIncome,
    },
    {
      id: 3,
      title: 'Agregar categoría',
      onClick: handleOpenCategory,
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
        userMonthId={userMonthId}
      />
      <CategoryModal
        toggleCategoryModal={toggleCategoryModal}
        setToggleCategoryModal={setToggleCategoryModal}
        userMonthId={userMonthId}
      />
      <ExpenseModal
        toggleExpenseModal={toggleExpenseModal}
        setToggleExpenseModal={setToggleExpenseModal}
        userMonthId={userMonthId}
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

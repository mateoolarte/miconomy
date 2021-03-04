import { ReactElement } from 'react';

export default function Actions(): ReactElement {
  function handleOpenIncome() {
    return null;
  }

  function handleOpenCategory() {
    return null;
  }

  function handleOpenExpense() {
    return null;
  }

  return (
    <div className="flex flex-wrap mb-4">
      <p className="mb-2 w-full">Acciones</p>
      <button
        type="button"
        onClick={handleOpenIncome}
        className="px-6 py-2 mb-2 md:mb-0 md:mr-2 rounded bg-blue-500 hover:bg-blue-600 text-white md:text-lg w-full md:w-auto"
      >
        Agregar ingreso
      </button>
      <button
        type="button"
        onClick={handleOpenCategory}
        className="px-6 py-2 mb-2 md:mb-0 md:mr-2 rounded bg-blue-500 hover:bg-blue-600 text-white md:text-lg w-full md:w-auto"
      >
        Agregar categoría
      </button>
      <button
        type="button"
        onClick={handleOpenExpense}
        className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white md:text-lg w-full md:w-auto"
      >
        Agregar gasto
      </button>
    </div>
  );
}

import { ReactElement, useState } from 'react';

import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';

const options = [
  {
    id: 1,
    label: 'Mes normal',
    value: 'mes-normal',
  },
  {
    id: 2,
    label: 'Mes ahorrador',
    value: 'mes-ahorrador',
  },
];

export default function EmptyView(): ReactElement {
  const [currentBudget, setCurrentBudget] = useState('');

  function handleBudget(e) {
    e.preventDefault();
  }

  return (
    <div className="w-11/12 sm:w-96 text-center mt-8 mx-auto">
      <h3 className="font-bold">Crea o asigna un presupuesto para este mes</h3>
      <p className="mb-8">Así podras llevar el control de tus gastos</p>

      <Select
        label="Asignar un presupuesto"
        required
        options={options}
        onBlur={(e) => setCurrentBudget(e.target.value)}
        value={currentBudget}
      />

      <Button
        type="submit"
        disabled={!currentBudget}
        fullWidth
        color="green"
        size="medium"
        onClick={handleBudget}
      >
        Crear presupuesto
      </Button>
    </div>
  );
}

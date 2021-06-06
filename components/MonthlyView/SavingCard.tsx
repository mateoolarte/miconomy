import { ReactElement } from 'react';

import Anchor from '../ui/Anchor';

function getTotalSavings(accum, currentValue) {
  return (accum += currentValue.value);
}

function getPendingSavings(accum, currentValue) {
  if (!currentValue.sent) {
    return (accum += 1);
  }

  return accum;
}

interface Props {
  savings: any;
}

export default function SavingCard({ savings }: Props): ReactElement {
  const currentSavings = savings.reduce(getTotalSavings, 0);
  const savingsPending = savings.reduce(getPendingSavings, 0);

  return (
    <div className="p-4 bg-gray-100 relative">
      <h3 className="font-semibold">Ahorros</h3>
      <p>Ahorro actual: {currentSavings}</p>
      {savingsPending > 0 && (
        <p className="mb-8 text-gray-500">
          Tienes pendiente de enviar {savingsPending} ahorro
          {savingsPending > 1 ? 's' : ''}
        </p>
      )}
      {savingsPending <= 0 && (
        <p className="mb-8 text-gray-500 text-sm">
          Ya enviaste todos tus ahorros de este mes :)
        </p>
      )}
      <div className="text-right absolute bottom-4 right-4">
        <Anchor link="/savings" text="Ver más" color="green" />
      </div>
    </div>
  );
}

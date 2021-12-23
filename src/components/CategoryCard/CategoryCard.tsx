import { ReactElement } from 'react';
import classnames from 'classnames';

import { Anchor } from '../ui/Anchor';
import { ProgressBar } from '../ui/ProgressBar';

const STATE_HEALTHY = 50;
const STATE_POOR = 90;
const STATE_WARNING = 51;

function getStatusColor(status) {
  let color = null;

  if (status <= STATE_HEALTHY) color = 'green';
  if (status >= STATE_POOR) color = 'red';
  if (status >= STATE_WARNING && status < STATE_POOR) color = 'yellow';

  return color;
}

function getCategoryBudget(accum, currentValue) {
  return (accum += currentValue.itemBudget);
}

function getTotalExpenses(accum, currentValue) {
  return (
    accum +
    currentValue.expense.reduce((accumE, currentValueE) => {
      return accumE + currentValueE.value;
    }, 0)
  );
}

interface Props {
  id: number;
  category: {
    id: number;
    isActive: boolean;
    name: string;
  };
  items: any;
}

export function CategoryCard({ category, items }: Props): ReactElement {
  const budget = items.reduce(getCategoryBudget, 0);
  const totalExpenses = items.reduce(getTotalExpenses, 0);
  const healhtyStatus =
    totalExpenses && budget ? (totalExpenses / budget) * 100 : 0;

  const classNames = classnames('p-4', {
    'bg-gray-100': healhtyStatus === 0 || healhtyStatus <= STATE_HEALTHY,
    'bg-red-200': healhtyStatus >= STATE_POOR,
    'bg-yellow-200':
      healhtyStatus >= STATE_WARNING && healhtyStatus < STATE_POOR,
  });

  return (
    <div className={classNames}>
      <h3 className="font-semibold">{category.name}</h3>
      <p>Presupuesto: {budget}</p>
      <p className="mb-4">Gasto actual: {totalExpenses}</p>
      <ProgressBar color={getStatusColor(healhtyStatus)} />
      <div className="text-right">
        <Anchor link="/income" text="Ver más" />
      </div>
    </div>
  );
}

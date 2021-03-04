import { ReactElement } from 'react';
import classnames from 'classnames';

import Anchor from '../ui/Anchor';
import ProgressBar from '../ui/ProgressBar';

const STATE_HEALTHY = 'healthy';
const STATE_POOR = 'poor';
const STATE_WARNING = 'warning';

function getStateColor(state) {
  let color = null;

  switch (state) {
    case STATE_HEALTHY:
      color = 'green';
      break;
    case STATE_POOR:
      color = 'red';
      break;
    case STATE_WARNING:
      color = 'yellow';
      break;
  }

  return color;
}

export default function CategoryCard(): ReactElement {
  const state = 'healthy' || 'warning' || 'poor';

  const classNames = classnames('p-4', {
    'bg-gray-100': state === STATE_HEALTHY,
    'bg-red-200': state === STATE_POOR,
    'bg-yellow-200': state === STATE_WARNING,
  });

  return (
    <div className={classNames}>
      <h3 className="font-semibold">Entretenimiento</h3>
      <p>Presupuesto: $150.000</p>
      <p className="mb-4">Gasto actual: $62.000</p>
      <ProgressBar color={getStateColor(state)} />
      <div className="text-right">
        <Anchor link="/income" text="Ver más" color={getStateColor(state)} />
      </div>
    </div>
  );
}

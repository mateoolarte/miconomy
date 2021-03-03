import { ReactElement } from 'react';

import Anchor from '../ui/Anchor';
import ProgressBar from '../ui/ProgressBar';

import { Wrapper } from './styled';

export default function CategoryCard(): ReactElement {
  return (
    <Wrapper className="bg-gray-100 p-4">
      <h3 className="font-semibold">Entretenimiento</h3>
      <p>Presupuesto: $150.000</p>
      <p className="mb-4">Gasto actual: $62.000</p>
      <ProgressBar color="green" />
      <div className="text-right">
        <Anchor link="/income" text="Ver más" color="gray" />
      </div>
    </Wrapper>
  );
}

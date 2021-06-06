import { ReactElement } from 'react';

import CategoryCard from '../CategoryCard';
import SavingCard from './SavingCard';

interface Props {
  categories: any;
  savings: any;
}

export default function Categories({
  categories,
  savings,
}: Props): ReactElement {
  return (
    <>
      <p className="mb-2 w-full">Categorías</p>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
        {savings && <SavingCard savings={savings} />}
      </div>
    </>
  );
}

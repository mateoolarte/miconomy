import { ReactElement } from 'react';

import CategoryCard from '../CategoryCard';

export default function Categories(): ReactElement {
  return (
    <>
      <p className="mb-2 w-full">Categorías</p>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map(index => {
          return <CategoryCard key={index} />;
        })}
      </div>
    </>
  );
}

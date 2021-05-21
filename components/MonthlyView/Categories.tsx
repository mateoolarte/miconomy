import { ReactElement } from 'react';

import CategoryCard from '../CategoryCard';

interface Props {
  categories: any;
}

export default function Categories({ categories }: Props): ReactElement {
  return (
    <>
      <p className="mb-2 w-full">Categorías</p>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </>
  );
}

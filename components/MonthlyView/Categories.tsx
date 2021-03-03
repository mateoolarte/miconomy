import { ReactElement } from 'react';
import CategoryCard from '../CategoryCard';

export default function Categories(): ReactElement {
  return (
    <>
      <p className="mb-2 w-full">Categorías</p>
      <div className="flex flex-wrap">
        {[1, 2, 3, 4, 5].map(index => {
          return <CategoryCard key={index} />;
        })}
      </div>
    </>
  );
}

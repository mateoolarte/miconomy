import { ReactElement } from 'react';

interface ListRowProps {
  title: string;
  value: number;
}

export function ListRow({ title, value }: ListRowProps): ReactElement {
  return (
    <div className="flex w-full h-12 items-center px-2">
      <span className="w-1/2 justify-self-end font-bold">{title}:</span>
      <span className="w-1/2 text-right">${value}</span>
    </div>
  );
}

import { ReactElement } from 'react';
import Link from 'next/link';

interface Props {
  status: number;
  error: any;
  incomes: Array<any>;
  available: number;
  lastExpense: any;
  notInBudget: number;
  savings: number;
}

export default function OverviewMobile({
  incomes,
  lastExpense,
  available,
  notInBudget,
  savings,
}: Props): ReactElement {
  return (
    <Link href="/income">
      <a className="block p-2 shadow-lg rounded border border-gray-100 text-center mb-4">
        <div className="mb-4">
          <h3 className="font-semibold text-base">Ingresos:</h3>
          {incomes?.length && (
            <ul className="text-sm">
              {incomes.map(({ id, description, value }) => {
                return (
                  <li key={id}>
                    {description}: {value}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="">
          <h3 className="font-semibold text-base">Disponible:</h3>
          <p className="text-lg mb-2">{available}</p>
          {notInBudget > 0 && (
            <strong className="block mb-1 text-xs text-gray-500 font-normal">
              No presupuestado: {notInBudget}
            </strong>
          )}
          {savings > 0 && (
            <strong className="block text-xs text-gray-500 font-normal">
              Ahorro mes actual: {savings}
            </strong>
          )}
        </div>
      </a>
    </Link>
  );
}

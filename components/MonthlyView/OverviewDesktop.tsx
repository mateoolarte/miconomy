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

export default function OverviewDesktop({
  incomes,
  lastExpense,
  available,
  notInBudget,
  savings,
}: Props): ReactElement {
  return (
    <div className="flex xl:w-4/5 text-center mb-8">
      <Link href="/income">
        <a className="block w-1/3 p-4 border-2 border-r-0 border-gray-300">
          <h3 className="font-semibold text-lg">Ingresos</h3>
          {incomes?.length && (
            <ul>
              {incomes.map(({ id, description, value }) => {
                return (
                  <li key={id}>
                    {description}: {value}
                  </li>
                );
              })}
            </ul>
          )}
        </a>
      </Link>

      <div className="w-1/3 p-4 border-2 border-r-0 border-gray-300">
        <h3 className="font-semibold text-lg">Total gastos</h3>
        <p>$2.000.000</p>
        {lastExpense?.description && (
          <strong className="font-normal block text-sm text-gray-500">
            Último gasto: {lastExpense?.description} {lastExpense?.value}
          </strong>
        )}
      </div>
      <div className="w-1/3 p-4 border-2 border-gray-300">
        <h3 className="font-semibold text-lg">Disponible</h3>
        <p>{available}</p>
        {notInBudget > 0 && (
          <strong className="font-normal block text-sm text-gray-500">
            No presupuestado: {notInBudget}
          </strong>
        )}
        {savings > 0 && (
          <strong className="font-normal block text-sm text-gray-500">
            Ahorro mes actual: {savings}
          </strong>
        )}
      </div>
    </div>
  );
}

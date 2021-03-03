import { ReactElement } from 'react';
import Link from 'next/link';

export default function OverviewDesktop(): ReactElement {
  return (
    <div className="flex xl:w-4/5 text-center mb-8">
      <Link href="/income">
        <a className="block w-1/3 p-4 border-2 border-r-0 border-gray-300">
          <h3 className="font-semibold text-lg">Ingresos</h3>
          <ul>
            <li>Salario: $1.800.000</li>
            <li>Freelo: $1.000.000</li>
          </ul>
        </a>
      </Link>

      <div className="w-1/3 p-4 border-2 border-r-0 border-gray-300">
        <h3 className="font-semibold text-lg">Total gastos</h3>
        <p>$2.000.000</p>
        <strong className="font-normal block text-sm text-gray-500">
          Último gasto: La isla $350.000
        </strong>
      </div>
      <div className="w-1/3 p-4 border-2 border-gray-300">
        <h3 className="font-semibold text-lg">Disponible</h3>
        <p>$1.000.000</p>
        <strong className="font-normal block text-sm text-gray-500">
          No presupuestado: $50.000
        </strong>
        <strong className="font-normal block text-sm text-gray-500">
          Ahorro mes actual: $700.000
        </strong>
      </div>
    </div>
  );
}

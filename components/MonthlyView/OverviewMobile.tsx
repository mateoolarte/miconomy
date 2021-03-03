import { ReactElement } from 'react';
import Link from 'next/link';

export default function OverviewMobile(): ReactElement {
  return (
    <Link href="/income">
      <a className="block p-2 shadow-lg rounded border border-gray-100 text-center mb-4">
        <div className="mb-4">
          <h3 className="font-semibold text-base">Ingresos:</h3>
          <ul className="text-sm">
            <li>Restante mes anterior: $2.000.000</li>
            <li>Salario: $3.000.000</li>
            <li>Freelo: $200.000</li>
          </ul>
        </div>
        <div className="">
          <h3 className="font-semibold text-base">Disponible:</h3>
          <p className="text-lg mb-2">$1.000.000</p>
          <strong className="block mb-1 text-xs text-gray-500 font-normal">
            No presupuestado: $50.000
          </strong>
          <strong className="block text-xs text-gray-500 font-normal">
            Ahorro mes actual: $700.000
          </strong>
        </div>
      </a>
    </Link>
  );
}

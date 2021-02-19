import { ReactElement } from 'react';
import Link from 'next/link';

import Navigation from '../Navigation';

export function Logo(): ReactElement {
  return (
    <div className="w-1/4 text-center">
      <Link href="/">
        <a className="font-sans text-4xl font-bold hover:text-gray-600">
          Miconomy
        </a>
      </Link>
    </div>
  );
}

export default function Header(): ReactElement {
  return (
    <header className="shadow-md py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

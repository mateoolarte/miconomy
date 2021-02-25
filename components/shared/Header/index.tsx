import { ReactElement } from 'react';
import Link from 'next/link';

import Navigation from '../Navigation';

export function Logo(): ReactElement {
  return (
    <div className="w-full lg:w-1/4 text-center lg:text-left">
      <Link href="/">
        <a className="font-sans text-3xl lg:text-4xl font-bold hover:text-gray-600">
          Miconomy
        </a>
      </Link>
    </div>
  );
}

export default function Header(): ReactElement {
  return (
    <header className="shadow-md py-2 lg:py-4 mb-4 mb:mb-8">
      <div className="w-11/12 max-w-7xl mx-auto flex items-center">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

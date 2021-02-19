import { ReactElement } from 'react';
import Header from '../Header';

import { LayoutProps } from './interfaces';

export default function Layout({
  noHeader,
  children,
  className,
}: LayoutProps): ReactElement {
  return (
    <main>
      {!noHeader && <Header />}
      <section
        className={`w-11/12 md:max-w-7xl mx-auto ${className ? className : ''}`}
      >
        {children}
      </section>
    </main>
  );
}

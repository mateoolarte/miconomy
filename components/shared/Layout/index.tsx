import { ReactElement } from 'react';
import Header from '../Header';

import { LayoutProps } from './interfaces';

export default function Layout({
  noHeader,
  children,
  className,
  wrapperClassName,
}: LayoutProps): ReactElement {
  return (
    <main className={wrapperClassName || ''}>
      {!noHeader && <Header />}
      <section
        className={`w-11/12 md:max-w-7xl mx-auto mb-24 ${
          className ? className : ''
        }`}
      >
        {children}
      </section>
    </main>
  );
}

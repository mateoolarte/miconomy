import { ReactElement } from 'react';
import { Header } from '../Header';

interface LayoutProps {
  noHeader?: boolean;
  children: object | string;
  className?: string;
  wrapperClassName?: string;
}

export function Layout({
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

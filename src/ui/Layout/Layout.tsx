import { ReactNode } from 'react';

import { Header } from '../Header';
import { Nav } from '../Nav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <section>
      <Header />
      <main>{children}</main>
      <Nav />
    </section>
  );
}

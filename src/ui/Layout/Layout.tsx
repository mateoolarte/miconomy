import { ReactNode } from 'react';

import { Header } from '../Header';
import { Nav } from '../Nav';

import { Container } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <section>
      <Header />
      <Container>{children}</Container>
      <Nav />
    </section>
  );
}

import { ReactNode } from 'react';

import { Header } from '../Header';
import { Nav } from '../Nav';

import { Container } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function Layout({ children, hideNav }: LayoutProps) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      {!hideNav && <Nav />}
    </>
  );
}

'use client';

import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import { Header } from '../Header';
import { Nav } from '../Nav';

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function Layout({ children, hideNav }: LayoutProps) {
  return (
    <>
      <Header />
      {children && (
        <Box as="main" px="2" pb="24">
          {children}
        </Box>
      )}
      {!hideNav && <Nav />}
    </>
  );
}

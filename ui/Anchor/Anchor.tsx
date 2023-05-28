import { ReactElement, ReactNode } from 'react';
import { Link as LinkUI } from '@chakra-ui/react';
import Link from 'next/link';

export interface AnchorProps {
  link: string;
  children: ReactNode;
}

export function Anchor({ link, children }: AnchorProps): ReactElement {
  return (
    <LinkUI as={Link} href={link}>
      {children}
    </LinkUI>
  );
}

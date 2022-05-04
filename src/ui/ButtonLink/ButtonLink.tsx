import React, { ReactNode } from 'react';
import Link from 'next/link';

import { Wrapper } from './ButtonLink.styles';

interface ButtonLinkProps {
  link: string;
  fullwidth?: boolean;
  children: ReactNode;
}

export function ButtonLink({ link, children, fullwidth }: ButtonLinkProps) {
  return (
    <Link href={link} passHref>
      <Wrapper fullwidth={fullwidth}>{children}</Wrapper>
    </Link>
  );
}

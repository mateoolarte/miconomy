import { ReactElement } from 'react';
import Link from 'next/link';

export interface AnchorProps {
  link: string;
  text: string;
}

export function Anchor({ link, text }: AnchorProps): ReactElement {
  return (
    <Link legacyBehavior href={link}>
      <a>{text}</a>
    </Link>
  );
}

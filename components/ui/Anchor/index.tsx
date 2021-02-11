import { ReactElement } from 'react';
import Link from 'next/link';
import { AnchorProps } from './interfaces';

export default function Anchor({
  link,
  text,
  className,
}: AnchorProps): ReactElement {
  return (
    <Link href={link}>
      <a
        className={`mb-12 underline text-blue-500 font-semibold hover:text-blue-600 ${className}`}
      >
        {text}
      </a>
    </Link>
  );
}

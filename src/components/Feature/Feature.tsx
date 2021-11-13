import { ReactElement } from 'react';
import Link from 'next/link';

interface FeatureProps {
  children: object | string;
  link?: string;
}

export function Feature({ children, link }: FeatureProps): ReactElement {
  return (
    <Link href={link}>
      <a className="border-2 border-gray-300 border-opacity-50 p-2 grid grid-cols-1 grid-rows-2 justify-items-center items-center cursor-pointer hover:bg-gray-300 hover:bg-opacity-10 hover:shadow hover:border-transparent">
        {children}
      </a>
    </Link>
  );
}

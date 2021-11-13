import { ReactElement } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

type ColorOptions = undefined | 'default' | 'gray' | 'red' | 'yellow' | 'green';
export interface AnchorProps {
  link: string;
  text: string;
  className?: string;
  color?: ColorOptions;
}

export function Anchor({
  link,
  text,
  className,
  color,
}: AnchorProps): ReactElement {
  const classNames = classnames('mb-12 underline font-semibold', className, {
    'text-blue-500 hover:text-blue-600': !color || color === 'default',
    'text-gray-700 hover:text-gray-800': color === 'gray',
    'text-yellow-700 hover:text-yellow-800': color === 'yellow',
    'text-red-700 hover:text-red-800': color === 'red',
  });

  return (
    <Link href={link}>
      <a className={classNames}>{text}</a>
    </Link>
  );
}

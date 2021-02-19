import { ReactElement } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import items from './data';

export default function Navigation(): ReactElement {
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="w-3/4">
      <ul className="flex items-center justify-end">
        {items.map(({ id, title, link }) => {
          const classNameLink = classnames(
            'mx-6 text-lg font-bold text-gray-700 hover:text-blue-700',
            { 'text-blue-700': pathname === link }
          );

          return (
            <li key={id}>
              <Link href={link}>
                <a className={classNameLink}>{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

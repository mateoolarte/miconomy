import { ReactElement } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import items from './data';

export default function Navigation(): ReactElement {
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="w-full fixed bottom-0 left-0 py-1 md:py-2 shadow-md-reverse lg:shadow-none lg:py-0 lg:static lg:w-3/4">
      <ul className="flex items-center justify-evenly lg:justify-end">
        {items.map(({ id, title, link, Icon }) => {
          const classNameLink = classnames(
            'block text-xs mx-1 text-center lg:text-left md:mx-2 font-bold text-gray-700 md:mx-6 md:text-lg hover:text-blue-700',
            { 'text-blue-700': pathname === link }
          );

          return (
            <li key={id}>
              <Link href={link}>
                <a className={classNameLink}>
                  <span className="block lg:hidden">
                    <Icon className="h-6 mx-auto" />
                  </span>
                  {title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

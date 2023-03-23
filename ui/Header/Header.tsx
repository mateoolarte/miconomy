import Link from 'next/link';

import { Title, Wrapper } from './Header.styles';

export function Header() {
  return (
    <Wrapper>
      <Title>
        <Link legacyBehavior href="/">
          <a>Miconomy</a>
        </Link>
      </Title>
    </Wrapper>
  );
}

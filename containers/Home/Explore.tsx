import Link from 'next/link';

import { options } from './data';
import {
  ExploreContainer,
  Title,
  ExploreOptions,
  ExploreCard,
  ExploreLink,
} from './Home.styles';

export function Explore() {
  return (
    <ExploreContainer>
      <Title>Explora</Title>
      <ExploreOptions>
        {options.map(({ id, link, label, Icon }) => {
          return (
            <ExploreCard key={id}>
              <Link legacyBehavior href={link} passHref>
                <ExploreLink>
                  <Icon />
                  {label}
                </ExploreLink>
              </Link>
            </ExploreCard>
          );
        })}
      </ExploreOptions>
    </ExploreContainer>
  );
}

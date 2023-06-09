import NextLink from 'next/link';
import { Link, Card, CardBody, Icon } from '@chakra-ui/react';

import { ExploreItemType } from './types';

export function ExploreItem(props: ExploreItemType) {
  const { link, label, IconComponent } = props;

  return (
    <Link as={NextLink} href={link}>
      <Card align="center" justify="center">
        <CardBody textAlign="center">
          <Icon as={IconComponent} fontSize="4xl" />
          <p>{label}</p>
        </CardBody>
      </Card>
    </Link>
  );
}

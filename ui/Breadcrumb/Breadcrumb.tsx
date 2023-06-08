import React from 'react';
import Link from 'next/link';
import { Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { Wrapper, Item, PathLink, Path } from './Breadcrumb.styles';

type BreadcrumbOption = {
  label: string;
  path: string;
};

interface BreadcrumbProps {
  options: Array<BreadcrumbOption>;
}

export function Breadcrumb({ options }: BreadcrumbProps) {
  return (
    <Wrapper>
      {options.map((option, index) => {
        return (
          <Item key={option.label}>
            {index === 0 && <Icon as={AiOutlineArrowLeft} fontSize="lg" />}
            {option.path && (
              <>
                <Link legacyBehavior href={option.path} passHref>
                  <PathLink>{option.label}</PathLink>
                </Link>
                <span>/</span>
              </>
            )}

            {!option.path && <Path>{option.label}</Path>}
          </Item>
        );
      })}
    </Wrapper>
  );
}

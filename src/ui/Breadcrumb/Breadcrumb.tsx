import React from 'react';
import Link from 'next/link';

import { ArrowLeftOutlined } from '@ant-design/icons';

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
            {index === 0 && <ArrowLeftOutlined />}
            {option.path && (
              <>
                <Link href={option.path} passHref>
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

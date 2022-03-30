import { useState } from 'react';
import Link from 'next/link';
import {
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Popover } from 'antd';

import {
  Wrapper,
  List,
  Item,
  ItemPrimary,
  LinkText,
  LinkTextPrimary,
  ItemPrimaryBtn,
  ItemSecondary,
  ItemSecondaryBtn,
  PopOverStyles,
} from './Nav.styles';

export function Nav() {
  const [primaryAction, setPrimaryAction] = useState(false);
  const [secondaryAction, setSecondaryAction] = useState(false);

  function renderPrimaryActions() {
    return (
      <ul>
        <li>
          <button type="button">Gasto</button>
        </li>
      </ul>
    );
  }

  return (
    <Wrapper>
      <PopOverStyles />
      <List>
        <Item>
          <Link href="/">
            <a>
              <HomeOutlined />
              <LinkText>Inicio</LinkText>
            </a>
          </Link>
        </Item>
        <Item>
          <Link href="/entry">
            <a>
              <CalendarOutlined />
              <LinkText>Mes actual</LinkText>
            </a>
          </Link>
        </Item>
        <ItemPrimary>
          <Popover
            content={renderPrimaryActions()}
            trigger="click"
            visible={primaryAction}
            onVisibleChange={() => setPrimaryAction(!primaryAction)}
            overlayClassName="popover-primary"
          >
            <ItemPrimaryBtn type="button" isClosed={primaryAction}>
              <PlusOutlined rotate={primaryAction ? 45 : 0} />
              <LinkTextPrimary isClosed={primaryAction}>
                {primaryAction ? 'Cerrar' : 'Agregar'}
              </LinkTextPrimary>
            </ItemPrimaryBtn>
          </Popover>
        </ItemPrimary>
        <Item>
          <Link href="/savings">
            <a>
              <DollarOutlined />
              <LinkText>Ahorros</LinkText>
            </a>
          </Link>
        </Item>
        <ItemSecondary>
          <ItemSecondaryBtn type="button">
            <MoreOutlined />
            <LinkText>Más</LinkText>
          </ItemSecondaryBtn>
        </ItemSecondary>
      </List>
    </Wrapper>
  );
}

import {
  MdOutlineSavings,
  MdOutlineCalendarMonth,
  MdWallet,
  MdListAlt,
} from 'react-icons/md';

import { ExploreItemType } from './types';

export const options: ExploreItemType[] = [
  {
    id: 1,
    link: '/entry',
    label: 'Mes actual',
    IconComponent: MdOutlineCalendarMonth,
  },
  {
    id: 2,
    link: '/savings',
    label: 'Ahorros',
    IconComponent: MdOutlineSavings,
  },
  { id: 3, link: '/budgets', label: 'Presupuestos', IconComponent: MdWallet },
  {
    id: 4,
    link: '/categories',
    label: 'Categorías',
    IconComponent: MdListAlt,
  },
];

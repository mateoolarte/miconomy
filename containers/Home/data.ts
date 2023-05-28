import {
  MdOutlineSavings,
  MdOutlineCalendarMonth,
  MdWallet,
  MdListAlt,
} from 'react-icons/md';

export const options = [
  {
    id: 1,
    link: '/entry',
    label: 'Mes actual',
    Icon: MdOutlineCalendarMonth,
  },
  { id: 2, link: '/savings', label: 'Ahorros', Icon: MdOutlineSavings },
  { id: 3, link: '/budgets', label: 'Presupuestos', Icon: MdWallet },
  {
    id: 4,
    link: '/categories',
    label: 'Categorías',
    Icon: MdListAlt,
  },
];

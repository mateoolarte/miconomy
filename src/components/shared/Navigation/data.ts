import Grid from '../../ui/icons/Grid';
import Calendar from '../../ui/icons/Calendar';
import Clipboard from '../../ui/icons/Clipboard';
import Money from '../../ui/icons/Money';
import UserCircle from '../../ui/icons/UserCircle';

const items = [
  {
    id: 1,
    title: 'Dashboard',
    link: '/',
    Icon: Grid,
  },
  {
    id: 2,
    title: 'Mes actual',
    link: '/current-month',
    Icon: Calendar,
  },
  {
    id: 3,
    title: 'Presupuesto',
    link: '/budgets',
    Icon: Clipboard,
  },
  {
    id: 4,
    title: 'Ahorros',
    link: '/savings',
    Icon: Money,
  },
  {
    id: 5,
    title: 'Perfil',
    link: '/profile',
    Icon: UserCircle,
  },
];

export default items;

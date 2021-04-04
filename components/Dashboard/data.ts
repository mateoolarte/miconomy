import Calendar from '../ui/icons/Calendar';
import BudgetIcon from '../ui/icons/Budget';
import AvatarIcon from '../ui/icons/Avatar';
import MetricsIcon from '../ui/icons/Metrics';
import CategoriesIcon from '../ui/icons/Categories';
import MonthHistory from '../ui/icons/MonthHistory';
import IncomeHistoryIcon from '../ui/icons/IncomeHistory';
import SavingsIcon from '../ui/icons/Savings';
export const FEATURES = [
  {
    id: 1,
    name: 'currentMonth',
    label: 'Mes Actual',
    icon: Calendar,
    href: '/current-month',
  },
  {
    id: 2,
    name: 'budgets',
    label: 'Presupuestos',
    icon: BudgetIcon,
    href: '/budgets',
  },
  {
    id: 3,
    name: 'categories',
    label: 'Categorías',
    icon: CategoriesIcon,
    href: '/categories',
  },
  {
    id: 4,
    name: 'savings',
    label: 'Ahorros',
    icon: SavingsIcon,
    href: '/savings',
  },
  {
    id: 5,
    name: 'metrics',
    label: 'Métricas',
    icon: MetricsIcon,
    href: '/metrics',
  },
  {
    id: 6,
    name: 'profile',
    label: 'Perfil',
    icon: AvatarIcon,
    href: '/profile',
  },
  {
    id: 7,
    name: 'monthHistory',
    label: 'Historial de Meses',
    icon: MonthHistory,
    href: '/month-history',
  },
  {
    id: 8,
    name: 'incomeHistory',
    label: 'Historial de Ingresos',
    icon: IncomeHistoryIcon,
    href: 'income-history',
  },
];

export const MONTH_CHART_DATA = [
  {
    id: 'Entretenimiento',
    label: 'Entretenimiento',
    value: 200000,
    color: '#1CCAD8',
  },
  {
    id: 'Alimentación',
    label: 'Alimentación',
    value: 356000,
    color: '#EE6352',
  },
  {
    id: 'disponible',
    label: 'disponible',
    value: 500000,
    color: '#7EE081',
  },
  {
    id: 'Gimnasio',
    label: 'Gimnasio',
    value: 75000,
    color: '#5386E4',
  },
  {
    id: 'Transporte',
    label: 'Transporte',
    value: 230000,
    color: '#E1E2EF',
  },
];

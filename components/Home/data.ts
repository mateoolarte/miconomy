import {
  MdOutlineSavings,
  MdOutlineCalendarMonth,
  MdWallet,
  MdListAlt,
} from "react-icons/md";

import { ExploreItemT, BalanceT } from "./types";

export const options: ExploreItemT[] = [
  {
    id: 1,
    link: "/entry",
    label: "Mes actual",
    IconComponent: MdOutlineCalendarMonth,
  },
  {
    id: 2,
    link: "/savings",
    label: "Ahorros",
    IconComponent: MdOutlineSavings,
  },
  { id: 3, link: "/budgets", label: "Presupuestos", IconComponent: MdWallet },
  {
    id: 4,
    link: "/categories",
    label: "Categorías",
    IconComponent: MdListAlt,
  },
];

export const balanceOptions = (data: BalanceT | undefined) => {
  if (!data) return null;

  const { expenses, incomes } = data?.balance;

  const totalExpenses =
    expenses?.reduce((prev, current) => prev + current.value, 0) || 0;
  const totalIncomes =
    incomes?.reduce((prev, current) => prev + current.value, 0) || 0;

  if (totalExpenses == 0 && totalIncomes == 0) return null;

  const available = totalIncomes - totalExpenses;

  return [
    {
      id: 1,
      title: "Disponible",
      value: available,
    },
    {
      id: 2,
      title: "Gastos",
      value: totalExpenses,
    },
    {
      id: 3,
      title: "Ingresos",
      value: totalIncomes,
    },
  ];
};

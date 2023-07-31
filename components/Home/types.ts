import { IconType } from "react-icons";

import { Expense, Income } from "@/types";

export interface ExploreItemT {
  id: number;
  link: string;
  label: string;
  IconComponent: IconType;
}

export interface BalanceT {
  balance: {
    incomes: Income[];
    expenses: Expense[];
  };
}

export interface BalanceOption {
  id: number;
  title: string;
  value: number;
}

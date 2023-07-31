export interface Budget {
  id: number;
  name: string;
}

export interface Budgets {
  budgets: Budget[] | undefined;
}

export interface Category {
  id: number;
  name: string;
  amount: number;
}

export interface Expense {
  id: number;
  updatedAt: number;
  description: string;
  value: number;
}

export interface Income {
  id: number;
  value: number;
}

export interface EntryCategory extends Category {
  expenses: Expense[];
}

export interface Categories {
  categories: Category[] | undefined;
}

export interface Saving {
  id: number;
  name: string;
  fee: number;
}

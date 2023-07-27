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

export interface Categories {
  categories: Category[] | undefined;
}

export interface Saving {
  id: number;
  name: string;
  fee: number;
}

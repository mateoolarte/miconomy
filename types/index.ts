export interface Budget {
  id: number;
  name: string;
}

export interface Budgets {
  budgets: Budget[] | undefined;
}

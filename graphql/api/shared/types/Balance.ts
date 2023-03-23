import { objectType } from 'nexus';

export const Balance = objectType({
  name: 'Balance',
  definition(t) {
    t.list.field('incomes', {
      type: 'Income',
    });
    t.list.field('expenses', {
      type: 'Expense',
    });
  },
});

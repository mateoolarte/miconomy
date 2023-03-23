import { objectType } from 'nexus';

export const CategoryEntry = objectType({
  name: 'CategoryEntry',
  definition(t) {
    t.int('id');
    t.string('name');
    t.int('amount');
    t.list.field('expenses', {
      type: 'Expense',
    });
  },
});

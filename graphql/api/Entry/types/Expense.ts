import { objectType } from 'nexus';

export const Expense = objectType({
  name: 'Expense',
  definition(t) {
    t.int('id');
    t.string('description');
    t.int('value');
    t.string('updatedAt');
  },
});

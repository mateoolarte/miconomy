import { objectType } from 'nexus';

export const CategoryBudget = objectType({
  name: 'CategoryBudget',
  definition(t) {
    t.int('id');
    t.string('name');
    t.int('amount');
  },
});

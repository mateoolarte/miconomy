import { objectType } from 'nexus';

export const Budget = objectType({
  name: 'Budget',
  definition(t) {
    t.int('id');
    t.string('name');
    t.list.field('categories', {
      type: 'CategoryBudget',
    });
    t.list.field('savings', {
      type: 'SavingBudget',
    });
  },
});

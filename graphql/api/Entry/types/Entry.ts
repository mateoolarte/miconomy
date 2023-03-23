import { objectType } from 'nexus';

export const Entry = objectType({
  name: 'Entry',
  definition(t) {
    t.int('id');
    t.list.field('categories', {
      type: 'CategoryEntry',
    });
    t.list.field('savings', {
      type: 'SavingEntry',
    });
  },
});

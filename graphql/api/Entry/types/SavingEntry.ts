import { objectType } from 'nexus';

export const SavingEntry = objectType({
  name: 'SavingEntry',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('type');
    t.int('fee');
    t.boolean('sent');
  },
});

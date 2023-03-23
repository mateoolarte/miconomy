import { objectType } from 'nexus';

export const Saving = objectType({
  name: 'Saving',
  definition(t) {
    t.int('id');
    t.string('name');
    t.int('value');
    t.int('goal');
    t.string('type');
  },
});

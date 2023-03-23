import { objectType } from 'nexus';

export const Income = objectType({
  name: 'Income',
  definition(t) {
    t.int('id');
    t.int('value');
  },
});

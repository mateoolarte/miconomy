import { queryField, list, nonNull } from 'nexus';
import { Saving } from './resolvers';

export const savings = queryField('savings', {
  type: list(nonNull('Saving')),
  async resolve(_root, _, { db, user }) {
    return Saving.getSavings(db, user);
  },
});

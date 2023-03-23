import { queryField, nonNull } from 'nexus';
import { balanceResolver } from './resolvers/balance';

export const balance = queryField('balance', {
  type: nonNull('Balance'),
  args: {
    entryId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return balanceResolver(db, user, args);
  },
});

import { queryField, list, nonNull } from 'nexus';
import { Budget } from './resolvers';

export const budgets = queryField('budgets', {
  type: list(nonNull('Budget')),
  async resolve(_root, _, { db, user }) {
    return Budget.getBudgets(db, user);
  },
});

export const budget = queryField('budget', {
  type: nonNull('Budget'),
  args: {
    id: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.getBudget(db, user, args);
  },
});

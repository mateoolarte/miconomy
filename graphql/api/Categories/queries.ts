import { queryField, nonNull, list } from 'nexus';
import { Category } from './resolvers';

export const categories = queryField('categories', {
  type: list(nonNull('Category')),
  async resolve(_root, _, { db, user }) {
    return Category.getCategories(db, user);
  },
});

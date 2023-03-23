import { mutationField, nonNull } from 'nexus';
import { Category } from './resolvers';

export const updateCategory = mutationField('updateCategory', {
  type: nonNull('Category'),
  args: {
    id: nonNull('Int'),
    name: nonNull('String'),
  },
  async resolve(_root, args, { db, user }) {
    return Category.updateCategory(db, user, args);
  },
});

export const createCategory = mutationField('createCategory', {
  type: nonNull('Category'),
  args: {
    name: nonNull('String'),
  },
  async resolve(_root, args, { db, user }) {
    return Category.createCategory(db, user, args);
  },
});

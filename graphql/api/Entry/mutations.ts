import { mutationField, nonNull } from 'nexus';
import { Entry } from './resolvers';

export const createEntry = mutationField('createEntry', {
  type: nonNull('Entry'),
  args: {
    month: nonNull('Int'),
    year: nonNull('Int'),
    budgetId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.createEntry(db, user, args);
  },
});

export const createIncome = mutationField('createIncome', {
  type: nonNull('Income'),
  args: {
    value: nonNull('Int'),
    description: nonNull('String'),
    entryId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.createIncome(db, user, args);
  },
});

export const createExpense = mutationField('createExpense', {
  type: nonNull('Expense'),
  args: {
    value: nonNull('Int'),
    description: nonNull('String'),
    entryId: nonNull('Int'),
    categoryId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.createExpense(db, user, args);
  },
});

export const updateExpense = mutationField('updateExpense', {
  type: nonNull('Expense'),
  args: {
    value: nonNull('Int'),
    description: nonNull('String'),
    id: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.updateExpense(db, user, args);
  },
});

export const deleteExpense = mutationField('deleteExpense', {
  type: nonNull('Expense'),
  args: {
    id: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.deleteExpense(db, user, args);
  },
});

export const createCategoryEntry = mutationField('createCategoryEntry', {
  type: nonNull('CategoryEntry'),
  args: {
    entryId: nonNull('Int'),
    categoryId: nonNull('Int'),
    amount: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.createCategoryEntry(db, user, args);
  },
});

export const updateCategoryEntry = mutationField('updateCategoryEntry', {
  type: nonNull('CategoryEntry'),
  args: {
    entryId: nonNull('Int'),
    categoryId: nonNull('Int'),
    amount: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Entry.updateCategoryEntry(db, user, args);
  },
});

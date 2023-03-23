import { mutationField, nonNull } from 'nexus';
import { Budget } from './resolvers';

export const updateBudget = mutationField('updateBudget', {
  type: nonNull('Budget'),
  args: {
    id: nonNull('Int'),
    name: nonNull('String'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.updateBudget(db, user, args);
  },
});

export const createBudget = mutationField('createBudget', {
  type: nonNull('Budget'),
  args: {
    name: nonNull('String'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.createBudget(db, user, args);
  },
});

export const createCategoryBudget = mutationField('createCategoryBudget', {
  type: nonNull('CategoryBudget'),
  args: {
    budgetId: nonNull('Int'),
    categoryId: nonNull('Int'),
    amount: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.createCategoryBudget(db, user, args);
  },
});

export const updateCategoryBudget = mutationField('updateCategoryBudget', {
  type: nonNull('CategoryBudget'),
  args: {
    budgetId: nonNull('Int'),
    categoryId: nonNull('Int'),
    amount: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.updateCategoryBudget(db, user, args);
  },
});

export const deleteCategoryBudget = mutationField('deleteCategoryBudget', {
  type: nonNull('CategoryBudget'),
  args: {
    budgetId: nonNull('Int'),
    categoryId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.deleteCategoryBudget(db, user, args);
  },
});

export const createSavingBudget = mutationField('createSavingBudget', {
  type: nonNull('SavingBudget'),
  args: {
    budgetId: nonNull('Int'),
    savingId: nonNull('Int'),
    fee: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.createSavingBudget(db, user, args);
  },
});

export const updateSavingBudget = mutationField('updateSavingBudget', {
  type: nonNull('SavingBudget'),
  args: {
    budgetId: nonNull('Int'),
    savingId: nonNull('Int'),
    fee: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.updateSavingBudget(db, user, args);
  },
});

export const deleteSavingBudget = mutationField('deleteSavingBudget', {
  type: nonNull('SavingBudget'),
  args: {
    budgetId: nonNull('Int'),
    savingId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Budget.deleteSavingBudget(db, user, args);
  },
});

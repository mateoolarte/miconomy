import { entryResolver } from './entry';
import { createEntryResolver } from './createEntry';
import { createIncomeResolver } from './createIncome';
import { createExpenseResolver } from './createExpense';
import { updateExpenseResolver } from './updateExpense';
import { deleteExpenseResolver } from './deleteExpense';

import { entryCategoryResolver } from './entryCategory';
import { createCategoryEntryResolver } from './createCategoryEntry';
import { updateCategoryEntryResolver } from './updateCategoryEntry';

export const Entry = {
  getEntry: entryResolver,
  createEntry: createEntryResolver,
  createIncome: createIncomeResolver,
  createExpense: createExpenseResolver,
  updateExpense: updateExpenseResolver,
  deleteExpense: deleteExpenseResolver,
  getEntryCategory: entryCategoryResolver,
  createCategoryEntry: createCategoryEntryResolver,
  updateCategoryEntry: updateCategoryEntryResolver,
};

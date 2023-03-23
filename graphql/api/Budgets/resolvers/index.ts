import { budgetsResolver } from './budgets';
import { budgetResolver } from './budget';
import { updateBudgetResolver } from './updateBudget';
import { createBudgetResolver } from './createBudget';

import { createCategoryBudgetResolver } from './createCategoryBudget';
import { updateCategoryBudgetResolver } from './updateCategoryBudget';
import { deleteCategoryBudgetResolver } from './deleteCategoryBudget';

import { createSavingBudgetResolver } from './createSavingBudget';
import { updateSavingBudgetResolver } from './updateSavingBudget';
import { deleteSavingBudgetResolver } from './deleteSavingBudget';

export const Budget = {
  getBudgets: budgetsResolver,
  getBudget: budgetResolver,
  updateBudget: updateBudgetResolver,
  createBudget: createBudgetResolver,
  createCategoryBudget: createCategoryBudgetResolver,
  updateCategoryBudget: updateCategoryBudgetResolver,
  deleteCategoryBudget: deleteCategoryBudgetResolver,
  createSavingBudget: createSavingBudgetResolver,
  updateSavingBudget: updateSavingBudgetResolver,
  deleteSavingBudget: deleteSavingBudgetResolver,
};

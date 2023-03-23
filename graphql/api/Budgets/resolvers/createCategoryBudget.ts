import { checkUserAuth } from '@/utils/checkUserAuth';

import { getCategory } from '../../shared/utils/getCategory';

export async function createCategoryBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { budgetId, categoryId, amount } = args;

  await db.categoryBudget.create({
    data: {
      budgetId,
      categoryId,
      amount,
    },
  });
  const category = await getCategory(categoryId, db);
  const createdCategoryBudget = {
    ...category,
    amount,
  };

  return createdCategoryBudget;
}

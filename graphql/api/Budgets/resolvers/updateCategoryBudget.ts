import { checkUserAuth } from '@/utils/checkUserAuth';

import { getCategory } from '../../shared/utils/getCategory';

export async function updateCategoryBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { budgetId, categoryId, amount } = args;

  await db.categoryBudget.update({
    where: {
      categoryId_budgetId: {
        budgetId,
        categoryId,
      },
    },
    data: {
      amount,
    },
  });
  const category = await getCategory(categoryId, db);
  const updatedCategoryBudget = {
    ...category,
    amount,
  };

  return updatedCategoryBudget;
}

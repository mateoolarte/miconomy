import { checkUserAuth } from '@/utils/checkUserAuth';

import { getCategory } from '../../shared/utils/getCategory';

export async function deleteCategoryBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { budgetId, categoryId } = args;

  const categoryBudget = await db.categoryBudget.delete({
    where: {
      categoryId_budgetId: {
        budgetId,
        categoryId,
      },
    },
  });
  const category = await getCategory(categoryId, db);
  const deletedCategoryBudget = {
    ...category,
    amount: categoryBudget.amount,
  };

  return deletedCategoryBudget;
}

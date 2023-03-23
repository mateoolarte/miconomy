import { checkUserAuth } from '@/utils/checkUserAuth';

import { parseBudgetCategories } from '../../shared/utils/parseBudgetCategories';
import { parseBudgetSavings } from '../../shared/utils/parseBudgetSavings';

export async function budgetsResolver(db, user) {
  checkUserAuth(user);

  const getBudgets = await db.budget.findMany({
    where: {
      userId: user?.userId,
    },
    select: {
      id: true,
      name: true,
      categories: true,
      savings: true,
    },
  });

  const budgets = getBudgets.map((budget) => {
    const getCategories = budget.categories;
    const getSavings = budget.savings;
    const categories = getCategories.map(async (item) =>
      parseBudgetCategories(item, db)
    );
    const savings = getSavings.map(async (item) =>
      parseBudgetSavings(item, db)
    );

    return {
      id: budget.id,
      name: budget.name,
      categories,
      savings,
    };
  });

  return budgets;
}

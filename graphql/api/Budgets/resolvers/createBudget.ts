import { checkUserAuth } from '@/utils/checkUserAuth';

import { parseBudgetCategories } from '../../shared/utils/parseBudgetCategories';
import { parseBudgetSavings } from '../../shared/utils/parseBudgetSavings';

export async function createBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { name } = args;

  const createdBudget = await db.budget.create({
    data: {
      userId: user?.userId,
      name,
    },
    select: {
      id: true,
      name: true,
      categories: true,
      savings: true,
    },
  });
  const getCategories = createdBudget.categories;
  const getSavings = createdBudget.savings;
  const categories = getCategories.map(async (item) =>
    parseBudgetCategories(item, db)
  );
  const savings = getSavings.map(async (item) => parseBudgetSavings(item, db));
  const budget = {
    id: createdBudget.id,
    name: createdBudget.name,
    categories,
    savings,
  };

  return budget;
}

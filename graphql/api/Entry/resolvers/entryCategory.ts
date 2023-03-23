import { checkUserAuth } from '@/utils/checkUserAuth';

import { getCategory } from '../../shared/utils/getCategory';
import { getExpenses } from '../utils/getExpenses';

export async function entryCategoryResolver(db, user, args) {
  checkUserAuth(user);

  const { categoryId, entryId } = args;

  const category = await getCategory(categoryId, db);
  const expenses = await getExpenses(categoryId, entryId, db);
  const entryCategory = await db.entryCategory.findFirst({
    where: {
      entryId,
      categoryId,
    },
    select: {
      amount: true,
    },
  });

  return {
    id: categoryId,
    name: category?.name,
    amount: entryCategory?.amount,
    expenses,
  };
}

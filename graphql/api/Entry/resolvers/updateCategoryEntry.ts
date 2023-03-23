import { checkUserAuth } from '@/utils/checkUserAuth';

import { getCategory } from '../../shared/utils/getCategory';
import { getExpenses } from '../utils/getExpenses';

export async function updateCategoryEntryResolver(db, user, args) {
  checkUserAuth(user);

  const { entryId, categoryId, amount } = args;

  await db.entryCategory.update({
    where: {
      entryId_categoryId: {
        entryId,
        categoryId,
      },
    },
    data: {
      amount,
    },
  });
  const category = await getCategory(categoryId, db);
  const expenses = await getExpenses(categoryId, entryId, db);
  const createdCategoryEntry = {
    ...category,
    amount,
    expenses,
  };

  return createdCategoryEntry;
}

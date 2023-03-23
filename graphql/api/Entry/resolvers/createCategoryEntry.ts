import { checkUserAuth } from '@/utils/checkUserAuth';

import { getCategory } from '../../shared/utils/getCategory';

export async function createCategoryEntryResolver(db, user, args) {
  checkUserAuth(user);

  const { entryId, categoryId, amount } = args;

  await db.entryCategory.create({
    data: {
      entryId,
      categoryId,
      amount,
    },
  });
  const category = await getCategory(categoryId, db);
  const createdCategoryEntry = {
    ...category,
    amount,
    expenses: [],
  };

  return createdCategoryEntry;
}

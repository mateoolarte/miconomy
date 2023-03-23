import { getCategory } from '../../shared/utils/getCategory';
import { getExpenses } from './getExpenses';

export async function parseEntryCategories(item, entryId, db) {
  const categoryId = item.categoryId;
  const categoryAmount = item.amount;
  const category = await getCategory(categoryId, db);
  const expenses = await getExpenses(categoryId, entryId, db);

  return {
    ...category,
    amount: categoryAmount,
    expenses,
  };
}

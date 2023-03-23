import { checkUserAuth } from '@/utils/checkUserAuth';

import { getMonth } from '../utils/getMonth';
import { getYear } from '../utils/getYear';
import { parseBudgetCategories } from '../../shared/utils/parseBudgetCategories';
import { parseBudgetSavings } from '../../shared/utils/parseBudgetSavings';

export async function createEntryResolver(db, user, args) {
  checkUserAuth(user);

  const { month, year, budgetId } = args;

  const monthId = await getMonth(month, db);
  const yearId = await getYear(year, db);

  const searchEntryExist = await db.entry.findFirst({
    where: {
      monthId: monthId?.id,
      yearId: yearId?.id,
      userId: user?.userId,
    },
  });

  if (searchEntryExist) {
    throw new Error('Ya tienes creado este mes');
  }

  const entry = await db.entry.create({
    data: {
      monthId: monthId?.id,
      yearId: yearId?.id,
      userId: user?.userId,
    },
  });
  const getBudget = await db.budget.findUnique({
    where: {
      id: budgetId,
    },
    select: {
      categories: true,
      savings: true,
    },
  });
  const getCategories = getBudget.categories;
  const getSavings = getBudget.savings;
  const categories = await Promise.all(
    getCategories.map(async (item) => await parseBudgetCategories(item, db))
  );
  const savings = await Promise.all(
    getSavings.map(async (item) => await parseBudgetSavings(item, db))
  );
  const parseEntryCategories = categories.map((item) => {
    return {
      categoryId: item.id,
      amount: item.amount,
      entryId: entry.id,
    };
  });
  const parseEntrySavings = savings.map((item) => {
    return {
      savingId: item.id,
      fee: item.fee,
      entryId: entry.id,
    };
  });
  const entryCategories = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      amount: item.amount,
      expenses: [],
    };
  });
  const entrySavings = savings.map((item) => {
    return {
      id: item.id,
      name: item.name,
      fee: item.fee,
      sent: false,
    };
  });

  await db.entryCategory.createMany({
    data: parseEntryCategories,
  });
  await db.entrySaving.createMany({
    data: parseEntrySavings,
  });

  const createdEntry = {
    id: entry.id,
    categories: entryCategories,
    savings: entrySavings,
  };

  return createdEntry;
}

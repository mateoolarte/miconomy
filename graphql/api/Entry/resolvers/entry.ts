import { checkUserAuth } from '@/utils/checkUserAuth';

import { parseEntryCategories } from '../utils/parseEntryCategories';
import { parseEntrySavings } from '../utils/parseEntrySavings';
import { getMonth } from '../utils/getMonth';
import { getYear } from '../utils/getYear';

export async function entryResolver(db, user, args) {
  checkUserAuth(user);

  const { month, year } = args;

  const monthId = await getMonth(month, db);
  const yearId = await getYear(year, db);

  const getEntry = await db.entry.findFirst({
    where: {
      monthId: monthId?.id,
      yearId: yearId?.id,
      userId: user?.userId,
    },
    select: {
      id: true,
      categories: true,
      savings: true,
    },
  });

  if (!getEntry?.id) {
    return {
      id: null,
      categories: [],
      savings: [],
    };
  }

  const getCategories = getEntry.categories;
  const getSavings = getEntry.savings;
  const categories = getCategories.map(async (item) =>
    parseEntryCategories(item, getEntry.id, db)
  );
  const savings = getSavings.map(async (item) => parseEntrySavings(item, db));

  return {
    id: getEntry.id,
    categories,
    savings,
  };
}

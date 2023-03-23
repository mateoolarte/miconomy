import { checkUserAuth } from '@/utils/checkUserAuth';

export async function categoriesResolver(db, user) {
  checkUserAuth(user);

  const categories = await db.category.findMany({
    where: {
      userId: user?.userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return categories;
}

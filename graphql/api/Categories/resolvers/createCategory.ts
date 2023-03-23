import { checkUserAuth } from '@/utils/checkUserAuth';

export async function createCategoryResolver(db, user, args) {
  checkUserAuth(user);

  const { name } = args;

  const createdCategory = await db.category.create({
    data: {
      userId: user?.userId,
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return createdCategory;
}

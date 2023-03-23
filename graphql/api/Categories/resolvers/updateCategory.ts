import { checkUserAuth } from '@/utils/checkUserAuth';

export async function updateCategoryResolver(db, user, args) {
  checkUserAuth(user);

  const { id, name } = args;

  const updatedCategory = await db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return updatedCategory;
}

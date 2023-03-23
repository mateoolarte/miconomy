import { checkUserAuth } from '@/utils/checkUserAuth';

export async function updateSavingResolver(db, user, args) {
  checkUserAuth(user);

  const { id, name, goal, value } = args;

  const updatedSaving = await db.saving.update({
    where: {
      id,
    },
    data: {
      name,
      goal,
      value,
    },
    select: {
      id: true,
      name: true,
      value: true,
      goal: true,
      type: true,
    },
  });

  return updatedSaving;
}

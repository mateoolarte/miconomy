import { checkUserAuth } from '@/utils/checkUserAuth';

export async function createSavingResolver(db, user, args) {
  checkUserAuth(user);

  const { name, goal, value, type } = args;

  const createdSaving = await db.saving.create({
    data: {
      userId: user?.userId,
      name,
      goal,
      value: value || 0,
      type: type || 'saving',
    },
    select: {
      id: true,
      name: true,
      value: true,
      goal: true,
      type: true,
    },
  });

  return createdSaving;
}

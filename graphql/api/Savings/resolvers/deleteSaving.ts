import { checkUserAuth } from '@/utils/checkUserAuth';

export async function deleteSavingResolver(db, user, args) {
  checkUserAuth(user);

  const { id } = args;

  const deletedSaving = await db.saving.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      value: true,
      goal: true,
      type: true,
    },
  });

  return deletedSaving;
}

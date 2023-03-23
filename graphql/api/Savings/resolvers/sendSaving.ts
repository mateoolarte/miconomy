import { checkUserAuth } from '@/utils/checkUserAuth';

export async function sendSavingResolver(db, user, args) {
  checkUserAuth(user);

  const { id, value, entryId } = args;

  await db.entrySaving.update({
    where: {
      entryId_savingId: {
        entryId,
        savingId: id,
      },
    },
    data: {
      sent: true,
    },
  });
  const updatedSaving = await db.saving.update({
    where: {
      id,
    },
    data: {
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

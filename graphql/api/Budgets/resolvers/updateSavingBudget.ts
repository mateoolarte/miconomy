import { checkUserAuth } from '@/utils/checkUserAuth';

import { getSaving } from '../../shared/utils/getSaving';

export async function updateSavingBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { budgetId, savingId, fee } = args;

  await db.savingBudget.update({
    where: {
      budgetId_savingId: {
        budgetId,
        savingId,
      },
    },
    data: {
      fee,
    },
  });
  const saving = await getSaving(savingId, db);
  const updatedSavingBudget = {
    ...saving,
    fee,
  };

  return updatedSavingBudget;
}

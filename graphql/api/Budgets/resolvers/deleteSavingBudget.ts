import { checkUserAuth } from '@/utils/checkUserAuth';

import { getSaving } from '../../shared/utils/getSaving';

export async function deleteSavingBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { budgetId, savingId } = args;

  const savingBudget = await db.savingBudget.delete({
    where: {
      budgetId_savingId: {
        budgetId,
        savingId,
      },
    },
  });
  const saving = await getSaving(savingId, db);
  const deletedSavingBudget = {
    ...saving,
    fee: savingBudget.fee,
  };

  return deletedSavingBudget;
}

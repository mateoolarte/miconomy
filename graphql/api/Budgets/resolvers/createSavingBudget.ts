import { checkUserAuth } from '@/utils/checkUserAuth';

import { getSaving } from '../../shared/utils/getSaving';

export async function createSavingBudgetResolver(db, user, args) {
  checkUserAuth(user);

  const { budgetId, savingId, fee } = args;

  await db.savingBudget.create({
    data: {
      budgetId,
      savingId,
      fee,
    },
  });
  const saving = await getSaving(savingId, db);
  const createdSavingBudget = {
    ...saving,
    fee,
  };

  return createdSavingBudget;
}

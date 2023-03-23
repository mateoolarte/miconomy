import { getSaving } from './getSaving';

export async function parseBudgetSavings(item, db) {
  const savingId = item.savingId;
  const savingFee = item.fee;
  const saving = await getSaving(savingId, db);

  return {
    ...saving,
    fee: savingFee,
  };
}

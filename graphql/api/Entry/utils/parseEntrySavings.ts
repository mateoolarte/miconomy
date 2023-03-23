import { getSaving } from '../../shared/utils/getSaving';

export async function parseEntrySavings(item, db) {
  const savingId = item.savingId;
  const savingFee = item.fee;
  const savingSent = item.sent;
  const saving = await getSaving(savingId, db);

  return {
    ...saving,
    fee: savingFee,
    sent: savingSent,
  };
}

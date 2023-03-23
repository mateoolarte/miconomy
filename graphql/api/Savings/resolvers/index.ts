import { savingsResolver } from './savings';
import { createSavingResolver } from './createSaving';
import { updateSavingResolver } from './updateSaving';
import { deleteSavingResolver } from './deleteSaving';
import { sendSavingResolver } from './sendSaving';

export const Saving = {
  getSavings: savingsResolver,
  createSaving: createSavingResolver,
  updateSaving: updateSavingResolver,
  deleteSaving: deleteSavingResolver,
  sendSaving: sendSavingResolver,
};

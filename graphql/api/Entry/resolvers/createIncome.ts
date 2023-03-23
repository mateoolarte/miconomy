import { checkUserAuth } from '@/utils/checkUserAuth';

export async function createIncomeResolver(db, user, args) {
  checkUserAuth(user);

  const { value, description, entryId } = args;

  const income = await db.income.create({
    data: {
      value,
      description,
      entryId,
    },
  });

  const createdIncome = {
    id: income.id,
    value,
  };

  return createdIncome;
}

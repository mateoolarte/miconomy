import { checkUserAuth } from '@/utils/checkUserAuth';

export async function createExpenseResolver(db, user, args) {
  checkUserAuth(user);

  const { value, description, entryId, categoryId } = args;

  const expense = await db.expense.create({
    data: {
      value,
      description,
      entryId,
      categoryId,
    },
  });

  const createdExpense = {
    id: expense.id,
    value,
    description,
    updatedAt: expense.updatedAt,
  };

  return createdExpense;
}

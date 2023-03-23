import { checkUserAuth } from '@/utils/checkUserAuth';

export async function updateExpenseResolver(db, user, args) {
  checkUserAuth(user);

  const { value, description, id } = args;

  const expense = await db.expense.update({
    where: {
      id,
    },
    data: {
      value,
      description,
      updatedAt: new Date(),
    },
  });

  const updatedExpense = {
    id,
    value,
    description,
    updatedAt: expense.updatedAt,
  };

  return updatedExpense;
}

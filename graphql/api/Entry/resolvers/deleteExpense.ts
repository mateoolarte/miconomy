import { checkUserAuth } from '@/utils/checkUserAuth';

export async function deleteExpenseResolver(db, user, args) {
  checkUserAuth(user);

  const { id } = args;

  const expense = await db.expense.delete({
    where: {
      id,
    },
    select: {
      value: true,
      description: true,
    },
  });

  const deletedExpense = {
    id,
    value: expense.value,
    description: expense.description,
    updatedAt: expense.updatedAt,
  };

  return deletedExpense;
}

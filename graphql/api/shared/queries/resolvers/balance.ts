import { checkUserAuth } from '@/utils/checkUserAuth';

export async function balanceResolver(db, user, args) {
  checkUserAuth(user);

  const { entryId } = args;

  const expenses = await db.expense.findMany({
    where: {
      entryId,
      userId: user.id,
    },
    select: {
      id: true,
      description: true,
      value: true,
      updatedAt: true,
    },
  });

  const incomes = await db.income.findMany({
    where: {
      entryId,
    },
    select: {
      id: true,
      value: true,
    },
  });

  return {
    incomes,
    expenses,
  };
}

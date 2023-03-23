import { checkUserAuth } from '@/utils/checkUserAuth';

export async function savingsResolver(db, user) {
  checkUserAuth(user);

  const savings = await db.saving.findMany({
    where: {
      userId: user?.userId,
    },
    select: {
      id: true,
      name: true,
      value: true,
      goal: true,
      type: true,
    },
  });

  return savings;
}

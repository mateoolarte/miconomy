export async function getMonth(month, db) {
  return await db.month.findUnique({
    where: {
      value: month,
    },
    select: {
      id: true,
    },
  });
}

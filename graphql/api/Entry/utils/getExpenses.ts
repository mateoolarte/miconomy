export function getExpenses(categoryId, entryId, db) {
  return db.expense.findMany({
    where: {
      categoryId,
      entryId,
    },
    select: {
      id: true,
      description: true,
      value: true,
      updatedAt: true,
    },
  });
}

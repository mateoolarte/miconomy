export function getCategory(id, db) {
  return db.category.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });
}

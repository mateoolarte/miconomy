export function getSaving(id, db) {
  return db.saving.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });
}

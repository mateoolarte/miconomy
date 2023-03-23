export async function getYear(year, db) {
  return await db.year.findUnique({
    where: {
      value: year,
    },
    select: {
      id: true,
    },
  });
}

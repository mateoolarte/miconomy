import { Balance } from './Balance';
import { Actions } from './Actions';

export function Content({
  entryId,
  categories,
}: {
  entryId: any;
  categories: any;
}) {
  if (!entryId) return null;

  return (
    <>
      <Balance entryId={entryId} />

      <Actions entryId={entryId} categories={categories} />
    </>
  );
}

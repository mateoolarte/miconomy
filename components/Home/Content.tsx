import { Balance } from './Balance';
import { Actions } from './Actions';

interface ContentProps {
  entryId: number | null;
  categories: any;
}

export function Content(props: ContentProps) {
  const { entryId, categories } = props;

  if (!entryId) return null;

  return (
    <>
      <Balance entryId={entryId} />

      <Actions entryId={entryId} categories={categories} />
    </>
  );
}

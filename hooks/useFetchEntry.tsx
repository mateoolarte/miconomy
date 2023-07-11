import { useQuery } from '@apollo/client';

import { ENTRY } from '@/graphql/queries/entry';

export function useFetchEntry() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const response = useQuery(ENTRY, {
    variables: { month, year },
  });

  return response;
}

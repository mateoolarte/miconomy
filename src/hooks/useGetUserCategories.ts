import { useQuery } from '@apollo/client';

import { GET_USER_CATEGORIES } from '../graphql/queries/getUserCategories';

export function useGetUserCategories(): any {
  const { loading, error, data } = useQuery(GET_USER_CATEGORIES);

  return {
    loading,
    error,
    data: data?.getUserCategories,
  };
}

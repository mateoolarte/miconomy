import { useQuery } from '@apollo/client';

import { GET_USER_MONTH } from '../graphql/getUserMonth';

export function useGetUserMonth(month: string): any {
  const { loading, error, data } = useQuery(GET_USER_MONTH, {
    variables: { month },
  });

  return {
    loading,
    error,
    data: data?.getUserMonth,
  };
}

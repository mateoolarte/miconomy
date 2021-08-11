import { useQuery } from '@apollo/client';

import { GET_USER_MONTH } from '../graphql/getUserMonth';

export function useGetUserMonth(month: number, year: number): any {
  const { loading, error, data } = useQuery(GET_USER_MONTH, {
    variables: { month, year },
    skip: month == null || !year,
  });

  return {
    loading,
    error,
    data: data?.getUserMonth,
  };
}

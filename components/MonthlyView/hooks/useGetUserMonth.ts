import { useQuery, ApolloError } from '@apollo/client';

import { GET_USER_MONTH } from '../graphql/getUserMonth';

interface UserMonthRes {
  loading: boolean;
  error: ApolloError;
  data: {
    status: number;
    categories: Array<any>;
  };
}

export function useGetUserMonth(month: string): UserMonthRes {
  const { loading, error, data } = useQuery(GET_USER_MONTH, {
    variables: { month },
  });

  return {
    loading,
    error,
    data: data?.getUserMonth,
  };
}

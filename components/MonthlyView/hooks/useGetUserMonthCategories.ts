import { useQuery } from '@apollo/client';

import { GET_USER_MONTH_CATEGORIES } from '../graphql/getUserMonthCategories';

export function useGetUserMonthCategories(userMonthId: number): any {
  const { loading, error, data } = useQuery(GET_USER_MONTH_CATEGORIES, {
    variables: { userMonthId },
  });

  return {
    loading,
    error,
    data: data?.getUserMonthCategories,
  };
}

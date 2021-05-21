import { useQuery, ApolloError } from '@apollo/client';

import { OVERVIEW_MONTH } from '../../../graphql/queries/overviewMonth';

import { useGetMonthDates } from './useGetMonthDates';

interface OverviewMonthRes {
  loading: boolean;
  error: ApolloError;
  data: {
    status: number;
  };
}

export default function useOverviewMonth(): OverviewMonthRes {
  const { currentMonth } = useGetMonthDates();

  const { loading, error, data } = useQuery(OVERVIEW_MONTH, {
    variables: { month: currentMonth },
  });

  return {
    loading,
    error,
    data: data?.overviewMonth,
  };
}

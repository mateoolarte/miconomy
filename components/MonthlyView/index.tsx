import { ReactElement } from 'react';

import { useGetMonthDates } from './hooks/useGetMonthDates';
import { useGetUserMonth } from './hooks/useGetUserMonth';

import Layout from '../shared/Layout';
import { Overview } from './Overview';
import Categories from './Categories';
import Actions from './Actions';
import EmptyView from './EmptyView';

export default function MonthlyView(): ReactElement {
  const { monthName, currentMonth } = useGetMonthDates();
  const { loading, error, data } = useGetUserMonth(currentMonth);
  const status = data?.status;
  const categories = data?.categories;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout className="relative">
      {status === 204 && <EmptyView />}

      {status === 200 && (
        <>
          <h2 className="font-bold text-xl mb:text-2xl mb-4 text-center md:text-left">
            {monthName}
          </h2>

          <Overview />
          <Actions />
          <Categories categories={categories} />
        </>
      )}
    </Layout>
  );
}

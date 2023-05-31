import { useQuery } from '@apollo/client';

import { ENTRY } from '@/graphql/web/queries/entry';

import { Layout } from '@/ui/Layout';

import { EmptyState } from './EmptyState';
import { Content } from './Content';
import { Explore } from './Explore';

export function Home() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { error, data, loading } = useQuery(ENTRY, {
    variables: { month, year },
  });
  if (error) return <h2>Error! {error.message}</h2>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <Layout hideNav>
      <EmptyState entryId={data?.id} />

      <Content entryId={data?.id} categories={data?.categories} />

      <Explore />
    </Layout>
  );
}

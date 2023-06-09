import { useFetchEntry } from '@/hooks/useFetchEntry';

import { Layout } from '@/ui/Layout';
import { Loading } from '@/ui/Loading';

import { EmptyState } from './EmptyState';
import { Content } from './Content';
import { Explore } from './Explore';

export function Home() {
  const { error, data, loading } = useFetchEntry();

  if (error) return <h2>Error! {error.message}</h2>;
  if (loading) return <Loading />;

  const entry = data?.entry;
  const id = entry?.id;
  const categories = entry?.categories;

  return (
    <Layout hideNav>
      <EmptyState entryId={id} />

      <Content entryId={id} categories={categories} />

      <Explore />
    </Layout>
  );
}

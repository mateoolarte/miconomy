import { useFetchEntry } from '@/hooks/useFetchEntry';

import { Layout } from '@/ui/Layout';
import { Loading } from '@/ui/Loading';

import { EmptyState } from './EmptyState';
import { Content } from './Content';

export function Entry() {
  const { loading, error, data } = useFetchEntry();
  const entry = data?.entry;
  const id = entry?.id;
  const savings = entry?.savings;
  const categories = entry?.categories;

  if (error) return <h2>Error! {error.message}</h2>;
  if (loading) return <Loading />;

  return (
    <Layout>
      <EmptyState entryId={id} />

      <Content savings={savings} categories={categories} entryId={id} />
    </Layout>
  );
}

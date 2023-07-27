import { useFetchEntry } from "@/hooks/useFetchEntry";

import { Layout } from "@/ui/Layout";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";

import { EmptyState } from "./EmptyState";
import { Content } from "./Content";
import { Explore } from "./Explore";

export function Home() {
  const { error, data, loading } = useFetchEntry();

  if (loading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

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

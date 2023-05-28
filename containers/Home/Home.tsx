'use client';

import { Suspense } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { ENTRY } from '@/graphql/web/queries/entry';

import { Layout } from '@/ui/Layout';

import { EmptyState } from './EmptyState';
import { Content } from './Content';
import { Explore } from './Explore';

export function Home() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { error, data } = useSuspenseQuery(ENTRY, {
    variables: { month, year },
  });
  if (error) return <h2>Error! {error.message}</h2>;

  const { id, categories } = data?.entry;

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Layout hideNav>
        <EmptyState entryId={id} />

        <Content entryId={id} categories={categories} />

        <Explore />
      </Layout>
    </Suspense>
  );
}

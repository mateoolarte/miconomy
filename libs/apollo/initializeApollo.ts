import merge from 'deepmerge';
import { ApolloClient } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';

import { SSR_MODE } from '@/constants';

import { createApolloClient } from './createApolloClient';

type ApolloType = ApolloClient<NormalizedCacheObject> | undefined;

let apolloClient: ApolloType = undefined;

export function initializeApollo(initialState?: any): ApolloType {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from
    // getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (SSR_MODE) return client;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
}

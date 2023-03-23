import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';
import merge from 'deepmerge';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { checkAuth } from '../../utils/checkAuth';

export interface ResolverContext {
  req?: IncomingMessage;
  res?: ServerResponse;
}

let apolloClient: ApolloClient<NormalizedCacheObject> = null;
const DEFAULT_API_URL = '/api/graphql';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const { token } = checkAuth();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();
const link = from([authLink, httpLink]);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
  });
}

export function initializeApollo(
  initialState = null
): ApolloClient<NormalizedCacheObject> | undefined {
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
  if (typeof window === 'undefined') return client;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}

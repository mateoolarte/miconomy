import { ApolloClient, InMemoryCache } from '@apollo/client';

import { SSR_MODE } from '@/constants';

import { link } from './httpLink';

export function createApolloClient() {
  const cache = new InMemoryCache();

  return new ApolloClient({
    ssrMode: SSR_MODE,
    link,
    cache,
  });
}

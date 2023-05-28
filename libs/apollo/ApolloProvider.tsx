'use client';

import { ReactNode } from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { checkAuth } from '@/utils/checkAuth';

import { API_URL } from '@/constants';

const httpLink = new HttpLink({
  uri: API_URL,
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

const link = from([authLink, httpLink]);

function makeClient() {
  const isSsr = typeof window === 'undefined';

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: isSsr
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          link,
        ])
      : link,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}

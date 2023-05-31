import { HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

export const link = from([authLink, httpLink]);

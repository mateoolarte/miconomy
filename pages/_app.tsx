import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { createGlobalStyle } from 'styled-components';
import { useApollo } from '../libs/apollo';

const GlobalStyle = createGlobalStyle`
  .ant-popover-arrow {
    display: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.apolloStore);

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

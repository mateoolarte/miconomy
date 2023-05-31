import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/libs/apollo/useApollo';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps?.apolloStore);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

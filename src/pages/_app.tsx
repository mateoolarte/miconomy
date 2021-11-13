import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../libs/apollo';
import 'tailwindcss/tailwind.css';
import '../styles/typography.css';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.apolloStore);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

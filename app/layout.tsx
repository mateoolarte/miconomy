import { ReactNode } from 'react';
import { ApolloProvider } from '@/libs/apollo/ApolloProvider';
import { UIProvider } from '@/libs/chakra-ui/UIProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ApolloProvider>
          <UIProvider>{children}</UIProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

import { ReactNode } from 'react';
import { ApolloWrapper } from '@/libs/apollo/ApolloWrapper';
import { UIProvider } from '@/libs/chakra-ui/providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ApolloWrapper>
          <UIProvider>{children}</UIProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

import { ReactNode } from 'react';
import { ApolloWrapper } from '@/libs/apollo/ApolloWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

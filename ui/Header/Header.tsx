import Link from 'next/link';
import { Heading } from '@chakra-ui/react';

export function Header() {
  return (
    <Heading size="xl" fontWeight="800" textAlign="center" py={2} mb="6">
      <Link href="/">Miconomy</Link>
    </Heading>
  );
}

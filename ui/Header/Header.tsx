import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/react';

export function Header() {
  return (
    <Box mb="8">
      <Heading size="xl" fontWeight="800" textAlign="center">
        <Link href="/">Miconomy</Link>
      </Heading>
    </Box>
  );
}

import { Box, Heading, Grid } from '@chakra-ui/react';

import { options } from './data';

import { ExploreItem } from './ExploreItem';

export function Explore() {
  return (
    <Box mb={8}>
      <Heading as="h3" size="lg" textAlign="center" mb={4}>
        Explora
      </Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {options.map((item) => (
          <ExploreItem key={item.id} {...item} />
        ))}
      </Grid>
    </Box>
  );
}

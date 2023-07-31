import { useQuery } from "@apollo/client";
import { Heading, Box, Grid } from "@chakra-ui/react";

import { BALANCE } from "./graphql/balance";

import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";

import { BalanceItem } from "./BalanceItem";

import { balanceOptions } from "./data";
import { BalanceT } from "./types";

interface BalanceProps {
  entryId: number | null;
}

export function Balance({ entryId }: BalanceProps) {
  const { error, data, loading } = useQuery<BalanceT>(BALANCE, {
    variables: { entryId },
  });

  if (error) return <Error>{error.message}</Error>;
  if (loading) return <Loading />;

  const items = balanceOptions(data);

  if (!items) return null;

  return (
    <Box mb={8}>
      <Heading as="h3" size="lg" textAlign="center" mb={4}>
        Resumen del mes
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        {items.map((item) => (
          <BalanceItem key={item.id} data={item} />
        ))}
      </Grid>
    </Box>
  );
}

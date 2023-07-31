import { Box, GridItem, Text } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

import { BalanceOption } from "./types";

interface BalanceItemProps {
  data: BalanceOption;
}

export function BalanceItem({ data }: BalanceItemProps) {
  if (!data) return null;

  const { id, title, value } = data;

  const cardStyles =
    id === 1
      ? {
          colSpan: 2,
          backgroundColor: "blue.50",
        }
      : null;

  return (
    <GridItem key={id} p={4} borderRadius="base" boxShadow="md" {...cardStyles}>
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>{" "}
      <NumericFormat
        displayType="text"
        prefix={"$"}
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        renderText={(text) => (
          <Box as="strong" fontSize="xl">
            {text}
          </Box>
        )}
      />
    </GridItem>
  );
}

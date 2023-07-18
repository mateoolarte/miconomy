import NextLink from "next/link";
import { Icon, Flex, Link } from "@chakra-ui/react";
import { BsArrowRightCircle } from "react-icons/bs";

import { Budgets } from "@/types";

export function List({ budgets }: Budgets) {
  if (!budgets?.length) return null;

  return (
    <Flex flexDirection="column" rowGap={4} mb={5}>
      {budgets.map((budget) => {
        return (
          <Link
            as={NextLink}
            href={`/budgets/${budget.id}`}
            key={budget.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={4}
            px={5}
            borderRadius="base"
            fontWeight={700}
            boxShadow="md"
          >
            {budget.name} <Icon as={BsArrowRightCircle} fontSize="xl" />
          </Link>
        );
      })}
    </Flex>
  );
}

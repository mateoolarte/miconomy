import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import { Alert } from "../Alert";
import { Anchor } from "../Anchor";

export function Error({ children }: { children: ReactNode }) {
  return (
    <Box width="90%" mx="auto" mt={4}>
      <Alert status="error">
        <Box as="p" display="flex" gap={1}>
          Error! {children}. <Anchor link="/">Go to home</Anchor>
        </Box>
      </Alert>
    </Box>
  );
}

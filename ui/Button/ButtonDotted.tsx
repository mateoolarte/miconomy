import { MouseEvent, PropsWithChildren } from "react";
import { Icon, Flex } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ButtonDottedProps {
  handleAction: (e: MouseEvent<HTMLButtonElement & HTMLDivElement>) => void;
  icon: IconType;
}

export function ButtonDotted(props: PropsWithChildren<ButtonDottedProps>) {
  const { handleAction, icon, children } = props;

  return (
    <Flex
      as="button"
      type="button"
      onClick={handleAction}
      alignItems="center"
      justifyContent="center"
      width="100%"
      py={4}
      px={5}
      borderColor="gray.500"
      borderWidth="1px"
      borderStyle="dashed"
      borderRadius="base"
      background="none"
      fontWeight={700}
      textAlign="center"
      color="gray.500"
    >
      <Icon as={icon} mr={2} fontSize="lg" />
      {children}
    </Flex>
  );
}

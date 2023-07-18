import { MouseEvent, PropsWithChildren, memo } from "react";
import { Icon, Flex } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";

interface AddBtnProps {
  handleAction: (e: MouseEvent<HTMLButtonElement & HTMLDivElement>) => void;
}

function AddBtnComponent({
  children,
  handleAction,
}: PropsWithChildren<AddBtnProps>) {
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
      <Icon as={BsPlusCircle} mr={2} fontSize="lg" />
      {children}
    </Flex>
  );
}

export const AddBtn = memo(AddBtnComponent);

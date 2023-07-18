import { PropsWithChildren } from "react";
import { Alert as AlertChakra, AlertIcon } from "@chakra-ui/react";

interface AlertProps {
  status?: "error" | "success" | "warning" | "info";
}

export function Alert(props: PropsWithChildren<AlertProps>) {
  const { status = "info", children } = props;

  return (
    <AlertChakra status={status}>
      <AlertIcon />
      {children}
    </AlertChakra>
  );
}

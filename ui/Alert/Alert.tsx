import { ReactNode } from 'react';
import { Alert as AlertChakra, AlertIcon } from '@chakra-ui/react';

interface AlertProps {
  status?: 'error' | 'success' | 'warning' | 'info';
  children: ReactNode;
}

export function Alert(props: AlertProps) {
  const { status = 'info', children } = props;

  return (
    <AlertChakra status={status}>
      <AlertIcon />
      {children}
    </AlertChakra>
  );
}

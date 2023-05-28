import { useToast } from '@chakra-ui/react';

type ToastStatus = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  title: string;
  description?: string;
  status?: ToastStatus;
  duration?: number;
}

export function Toast({ title, description, status, duration }: ToastProps) {
  const toast = useToast();

  toast({
    title,
    description,
    status: status,
    duration,
    isClosable: true,
  });

  return null;
}

Toast.defaultProps = {
  status: 'info',
  duration: 5000,
};

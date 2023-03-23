import { ReactElement } from 'react';
import { Alert as AlertAnt } from 'antd';

interface AlertProps {
  message: string;
  handleClose?: any;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export function Alert({
  message,
  handleClose,
  type,
}: AlertProps): ReactElement {
  return (
    <AlertAnt message={message} onClose={handleClose} type={type} closable />
  );
}

import { ReactElement } from 'react';

import Delete from '../icons/Delete';

interface AlertProps {
  message: string;
  handleClose?: any;
}

export function Alert({ message, handleClose }: AlertProps): ReactElement {
  return (
    <div>
      <p>{message}</p>
      {handleClose && (
        <button type="button" onClick={handleClose}>
          <Delete />
        </button>
      )}
    </div>
  );
}

import { ReactElement } from 'react';
import classnames from 'classnames';

import Delete from '../icons/Delete';

import { AlertProps } from './interfaces';

export default function Alert({
  color,
  message,
  handleClose,
}: AlertProps): ReactElement {
  const className = classnames(
    'flex items-center fixed max-w-md top-4 right-28 py-2 pl-4 pr-3 rounded text-gray-50',
    { 'bg-red-500': color === 'red' },
    { 'bg-yellow-500': color === 'yellow' },
    { 'bg-green-500': color === 'green' }
  );

  return (
    <div className={className}>
      <p className="mr-3 w-11/12">{message}</p>
      {handleClose && (
        <button type="button" onClick={handleClose} className="w-5 h-5">
          <Delete />
        </button>
      )}
    </div>
  );
}

import { useState, ReactElement } from 'react';

import Delete from '../icons/Delete';

import { AlertProps } from './interfaces';

export default function Alert({ color, message }: AlertProps): ReactElement {
  const [isActive, setIsActive] = useState('flex');

  function handleClose(e) {
    e.preventDefault();

    setIsActive('hidden');
  }

  return (
    <div
      className={`${isActive} items-center fixed max-w-md top-4 right-28 py-2 pl-4 pr-3 rounded text-gray-50 bg-${color}-500`}
    >
      <p className="mr-3 w-11/12">{message}</p>
      <button type="button" onClick={handleClose} className="w-5 h-5">
        <Delete />
      </button>
    </div>
  );
}

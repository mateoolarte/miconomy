import { ReactElement } from 'react';
import classnames from 'classnames';

import Delete from '../icons/Delete';

import { ModalProps } from './interfaces';

export default function Modal({
  isActive,
  handleClose,
  children,
}: ModalProps): ReactElement {
  const className = classnames(
    'absolute w-screen h-screen top-0 left-0 bg-gray-600 bg-opacity-50 flex justify-center items-end lg:items-center',
    {
      hidden: !isActive,
      block: isActive,
    }
  );

  return (
    <div className={className}>
      <div className="bg-white rounded pb-4 px-4 pt-9 relative w-11/12 lg:w-auto lg:max-w-md min-w-min mb-4 lg:mb-0">
        <button
          type="button"
          onClick={handleClose}
          className="h-6 w-6 absolute top-2 right-2"
        >
          <Delete />
        </button>
        {children}
      </div>
    </div>
  );
}

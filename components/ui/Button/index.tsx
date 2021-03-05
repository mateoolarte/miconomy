import { ReactElement } from 'react';
import classnames from 'classnames';
import { ButtonProps } from './interfaces';

export default function Button({
  type,
  children,
  disabled,
  fullWidth,
  className,
  color,
  size,
  onClick,
}: ButtonProps): ReactElement {
  const classNames = classnames(
    'rounded transition-colors disabled:opacity-50 hover:shadow',
    className,
    {
      'w-full': fullWidth,
      'w-auto': !fullWidth,
      'bg-green-500 text-gray-50 hover:bg-green-600': color === 'green',
      'bg-blue-500 text-gray-50 hover:bg-blue-600': color === 'blue',
      'py-2.5 px-8 text-lg': size === 'medium',
      'py-2 px-6': size === 'small',
    }
  );

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

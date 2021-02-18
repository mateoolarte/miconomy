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
}: ButtonProps): ReactElement {
  const classNames = classnames(
    'rounded font-bold transition-colors disabled:opacity-50 hover:shadow',
    className,
    {
      'w-full': fullWidth,
      'w-auto': !fullWidth,
      'bg-green-500 text-gray-50 hover:bg-green-600': color === 'green',
      'py-2.5 px-8 text-lg': size === 'medium',
    }
  );

  return (
    <button type={type} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
}

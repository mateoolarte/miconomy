import { ReactElement } from 'react';

type TypeOptions = 'submit' | 'button';

interface ButtonProps {
  type: TypeOptions;
  children: object | string;
  disabled?: boolean;
  className?: string;
  onClick?: any;
}

export function Button({
  type,
  children,
  disabled,
  className,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

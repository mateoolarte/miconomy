import { ReactElement } from 'react';

type TypeOptions = 'submit' | 'button';

interface ButtonProps {
  type: TypeOptions;
  children: object | string;
  disabled?: boolean;
  onClick?: any;
}

export function Button({
  type,
  children,
  disabled,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

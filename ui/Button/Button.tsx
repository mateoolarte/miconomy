import { ReactElement, ReactNode } from 'react';
import { Button as ButtonUI } from '@chakra-ui/react';

type TypeOptions = 'submit' | 'button';

interface ButtonProps {
  type: TypeOptions;
  children: ReactNode;
  disabled?: boolean;
  onClick?: any;
  fullWidth?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  style: 'blue';
  loading?: boolean;
}

export function Button({
  type,
  children,
  disabled,
  onClick,
  fullWidth,
  size,
  style,
  variant,
  loading,
}: ButtonProps): ReactElement {
  return (
    <ButtonUI
      type={type}
      disabled={disabled}
      onClick={onClick}
      width={fullWidth ? '100%' : 'auto'}
      variant={variant}
      size={size}
      isLoading={loading}
      colorScheme={style}
    >
      {children}
    </ButtonUI>
  );
}

import { ReactElement, ReactNode } from 'react';
import { Button as ButtonAnt } from 'antd';

type TypeOptions = 'submit' | 'button';

interface ButtonProps {
  type: TypeOptions;
  children: ReactNode;
  disabled?: boolean;
  onClick?: any;
  fullWidth?: boolean;
  size?: 'large' | 'middle' | 'small';
  style?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
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
  loading,
}: ButtonProps): ReactElement {
  return (
    <ButtonAnt
      type={style}
      htmlType={type}
      disabled={disabled}
      onClick={onClick}
      block={fullWidth}
      size={size}
      loading={loading}
    >
      {children}
    </ButtonAnt>
  );
}

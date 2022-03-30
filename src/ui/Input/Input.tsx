import { ReactElement, useState } from 'react';
import { Input as InputAnt } from 'antd';

import EyeOpen from '../icons/EyeOpen';
import EyeClose from '../icons/EyeClose';

import { Wrapper, Label, Error, ShowPassword } from './Input.styles';

interface InputProps {
  type: string;
  label?: string;
  value: string | number;
  onChange: any;
  onBlur?: any;
  errorMessage?: string;
  showPlainPassword?: boolean;
  required?: boolean;
}

export function Input({
  type,
  label,
  value,
  onChange,
  onBlur,
  errorMessage,
  showPlainPassword,
  required,
}: InputProps): ReactElement {
  const hasEyeActivated = showPlainPassword && type === 'password';
  const [isPlainPassword, setIsPlainPassword] = useState(false);

  return (
    <Wrapper>
      {label && (
        <Label htmlFor={label} error={errorMessage}>
          {label}
        </Label>
      )}
      <InputAnt
        type={hasEyeActivated && isPlainPassword ? 'text' : type}
        id={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        status={errorMessage ? 'error' : undefined}
      />
      {hasEyeActivated && (
        <ShowPassword
          type="button"
          onClick={() => setIsPlainPassword(!isPlainPassword)}
          aria-label="Mostrar contraseña"
        >
          {isPlainPassword ? <EyeOpen /> : <EyeClose />}
        </ShowPassword>
      )}
      {errorMessage && <Error>{errorMessage}</Error>}
    </Wrapper>
  );
}

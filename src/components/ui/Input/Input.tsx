import { ReactElement, useState } from 'react';

import EyeOpen from '../icons/EyeOpen';
import EyeClose from '../icons/EyeClose';

interface InputProps {
  type: string;
  label?: string;
  value: string | number;
  onChange: any;
  onBlur?: any;
  errorMessage: string;
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
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        type={hasEyeActivated && isPlainPassword ? 'text' : type}
        id={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      {hasEyeActivated && (
        <button
          type="button"
          onClick={() => setIsPlainPassword(!isPlainPassword)}
        >
          {isPlainPassword ? <EyeOpen /> : <EyeClose />}
        </button>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

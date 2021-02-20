import { ReactElement } from 'react';
import { useState } from 'react';
import classnames from 'classnames';

import EyeOpen from '../icons/EyeOpen';
import EyeClose from '../icons/EyeClose';

import { InputProps } from './interfaces';

export default function Input({
  type,
  label,
  value,
  onChange,
  onBlur,
  className,
  errorMessage,
  showPlainPassword,
  required,
}: InputProps): ReactElement {
  const hasEyeActivated = showPlainPassword && type === 'password';
  const [isPlainPassword, setIsPlainPassword] = useState(false);
  const classNamesInput = classnames('border rounded mb-2', {
    'border-red-400': errorMessage,
    'border-gray-400': !errorMessage,
    'pr-12': hasEyeActivated,
  });
  const classNamesBtnPass = classnames(
    'absolute right-4 z-10 w-6 h-6 outline-none',
    {
      'top-10': label,
      'top-2.5': !label,
    }
  );

  return (
    <div className={`input-${type} flex flex-col mb-3 relative ${className}`}>
      {label && (
        <label htmlFor={label} className="mb-2">
          {label}
        </label>
      )}
      <input
        type={hasEyeActivated && isPlainPassword ? 'text' : type}
        id={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNamesInput}
        required={required}
      />
      {hasEyeActivated && (
        <button
          type="button"
          onClick={() => setIsPlainPassword(!isPlainPassword)}
          className={classNamesBtnPass}
        >
          {isPlainPassword ? (
            <EyeOpen className="text-gray-500 cursor-pointer" />
          ) : (
            <EyeClose className="text-gray-500 cursor-pointer" />
          )}
        </button>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

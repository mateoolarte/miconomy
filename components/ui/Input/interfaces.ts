import { ChangeEvent } from 'react';

export interface InputProps {
  type: string;
  label?: string;
  value: string;
  onChange?: ChangeEvent<HTMLInputElement>;
  onBlur?: ChangeEvent<HTMLInputElement>;
  className?: string;
  errorMessage: string;
  showPlainPassword?: boolean;
  required?: boolean;
}

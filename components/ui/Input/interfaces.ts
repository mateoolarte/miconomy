export interface InputProps {
  type: string;
  label?: string;
  value: string;
  onChange?: any;
  onBlur?: any;
  className?: string;
  errorMessage: string;
  showPlainPassword?: boolean;
  required?: boolean;
}

type OptionsType = {
  id: number;
  label: string;
  value: string;
};

export interface SelectProps {
  label?: string;
  required?: boolean;
  options: Array<OptionsType>;
  onBlur?: any;
  value: string;
  errorMessage?: string;
}

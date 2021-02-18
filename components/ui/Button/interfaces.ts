type TypeOptions = 'submit' | 'button';
type ColorOptions = 'green';
type SizeOptions = 'small' | 'medium' | 'large';

export interface ButtonProps {
  type: TypeOptions;
  children: object;
  disabled?: boolean;
  fullWidth?: boolean;
  className: string;
  color: ColorOptions;
  size: SizeOptions;
}

type AlertColors = 'red' | 'yellow' | 'green';

export interface AlertProps {
  color: AlertColors;
  message: string;
}

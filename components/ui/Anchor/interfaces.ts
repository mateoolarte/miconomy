type ColorOptions = undefined | 'default' | 'gray' | 'red' | 'yellow' | 'green';
export interface AnchorProps {
  link: string;
  text: string;
  className?: string;
  color?: ColorOptions;
}

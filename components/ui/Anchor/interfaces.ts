type ColorOptions = undefined | 'default' | 'gray' | 'red' | 'yellow';
export interface AnchorProps {
  link: string;
  text: string;
  className?: string;
  color?: ColorOptions;
}

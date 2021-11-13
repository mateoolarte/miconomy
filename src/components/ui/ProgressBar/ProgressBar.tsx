import { ReactElement } from 'react';
import classnames from 'classnames';

type ColorOptions = 'green' | 'red' | 'yellow';

interface ProgressBarProps {
  color: ColorOptions;
}

export function ProgressBar({ color }: ProgressBarProps): ReactElement {
  const classNameBox = classnames('rounded-sm mb-4 bg-gray-300', {
    'bg-gray-300': color === 'green' || color === 'yellow',
    'bg-gray-400': color === 'red',
  });
  const classNameBar = classnames('w-9/12 py-2 rounded-sm', {
    'bg-green-500': color === 'green',
    'bg-red-500': color === 'red',
    'bg-yellow-500': color === 'yellow',
  });

  return (
    <div className={classNameBox}>
      <div className={classNameBar}></div>
    </div>
  );
}

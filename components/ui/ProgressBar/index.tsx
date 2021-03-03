import { ReactElement } from 'react';
import classnames from 'classnames';

import { ProgressBarProps } from './interfaces';

export default function ProgressBar({ color }: ProgressBarProps): ReactElement {
  const classNameBar = classnames('w-9/12 py-2 rounded-sm', {
    'bg-green-500': color === 'green',
  });

  return (
    <div className="bg-gray-300 rounded-sm mb-4">
      <div className={classNameBar}></div>
    </div>
  );
}

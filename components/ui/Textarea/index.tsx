import { ReactElement } from 'react';
import classnames from 'classnames';

import { TextareaProps } from './interfaces';

export default function Textarea({
  label,
  required,
  value,
  onChange,
  errorMessage,
}: TextareaProps): ReactElement {
  const classNamesTextarea = classnames('border rounded mb-2 resize-none', {
    'border-red-400': errorMessage,
    'border-gray-400': !errorMessage,
  });

  return (
    <div className="textarea flex flex-col mb-3">
      {label && (
        <label htmlFor={label} className="mb-2">
          {label}
        </label>
      )}
      <textarea
        id={label}
        required={required}
        value={value}
        onChange={onChange}
        className={classNamesTextarea}
      />
    </div>
  );
}

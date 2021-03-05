import { ReactElement } from 'react';
import classnames from 'classnames';

import { SelectProps } from './interfaces';

export default function Select({
  label,
  required,
  options,
  onBlur,
  value,
  errorMessage,
}: SelectProps): ReactElement {
  const classNamesSelect = classnames('border rounded mb-2', {
    'border-red-400': errorMessage,
    'border-gray-400': !errorMessage,
  });

  return (
    <div className="select flex flex-col mb-3">
      {label && <label className="mb-2">{label}</label>}
      <select
        required={required}
        onBlur={onBlur}
        defaultValue={value}
        className={classNamesSelect}
      >
        <option value="">Selecciona una categoría</option>
        {options.map(({ id, label, value }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

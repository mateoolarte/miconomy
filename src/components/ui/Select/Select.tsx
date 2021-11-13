import { ReactElement } from 'react';
import classnames from 'classnames';

type OptionsType = {
  id: number;
  label: string;
  value: string;
};

interface SelectProps {
  label?: string;
  required?: boolean;
  options: Array<OptionsType>;
  onBlur?: any;
  onChange?: any;
  value: string;
  errorMessage?: string;
  defaultOption?: string;
}

export function Select({
  label,
  required,
  options,
  onBlur,
  onChange,
  value,
  errorMessage,
  defaultOption,
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
        onChange={onChange}
        value={value}
        className={classNamesSelect}
      >
        <option value="">{defaultOption}</option>
        {options.map(({ id, label, value }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

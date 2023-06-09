import { ChangeEventHandler } from 'react';
import { Select as SelectChakra } from '@chakra-ui/react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  emptyOptionText: string;
}

export function Select({
  options,
  value,
  onChange,
  emptyOptionText,
}: SelectProps) {
  return (
    <SelectChakra
      value={value}
      onChange={onChange}
      mb={4}
      placeholder={emptyOptionText}
    >
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </SelectChakra>
  );
}

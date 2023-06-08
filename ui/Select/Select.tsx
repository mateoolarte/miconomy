import { Select as SelectChakra } from '@chakra-ui/react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: any;
  emptyOptionText: string;
  defaultValue?: string | number;
}

export function Select({
  options,
  value,
  onChange,
  emptyOptionText,
  defaultValue,
}: SelectProps) {
  return (
    <SelectChakra
      value={value}
      defaultValue={defaultValue}
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

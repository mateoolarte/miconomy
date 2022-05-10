import { Select as SelectAnt } from 'antd';

const { Option } = SelectAnt;

import { Wrapper } from './Select.styles';

type SelectOption = {
  value: string | number;
  label: string;
};

interface SelectProps {
  options: Array<SelectOption>;
  value: string | number;
  onChange: any;
  emptyOptionText: string;
  emptyOptionValue: string | number;
  defaultValue?: string | number;
}

export function Select({
  options,
  value,
  onChange,
  emptyOptionText,
  emptyOptionValue,
  defaultValue,
}: SelectProps) {
  return (
    <Wrapper>
      <SelectAnt value={value} defaultValue={defaultValue} onChange={onChange}>
        <Option value={emptyOptionValue}>{emptyOptionText}</Option>
        {options.map((option) => {
          return (
            <Option value={option.value} key={option.value}>
              {option.label}
            </Option>
          );
        })}
      </SelectAnt>
    </Wrapper>
  );
}

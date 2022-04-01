import { Select as SelectAnt } from 'antd';

const { Option } = SelectAnt;

import { Wrapper } from './Select.styles';

export function Select({
  options,
  value,
  onChange,
  emptyOptionText,
  emptyOptionValue,
  defaultValue,
}) {
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

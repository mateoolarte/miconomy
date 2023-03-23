import { ReactNode } from 'react';
import { Tabs as TabsAnt } from 'antd';

const { TabPane } = TabsAnt;

type Option = {
  key: string;
  title: string;
  content: ReactNode;
};

interface TabsProps {
  defaultTab?: string;
  handleChange?: any;
  options: Array<Option>;
  centered?: boolean;
}

export function Tabs({
  defaultTab,
  handleChange,
  options,
  centered,
}: TabsProps) {
  return (
    <TabsAnt
      defaultActiveKey={defaultTab || '1'}
      onChange={handleChange}
      centered={centered}
    >
      {options.map((option) => {
        return (
          <TabPane tab={option.title} key={option.key}>
            {option.content}
          </TabPane>
        );
      })}
    </TabsAnt>
  );
}

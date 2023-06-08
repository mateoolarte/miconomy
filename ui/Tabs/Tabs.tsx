import { ReactNode } from 'react';
import {
  Tabs as TabsChakra,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

interface Option {
  key: string;
  title: string;
  content: ReactNode;
}

interface TabsProps {
  defaultTab?: string;
  handleChange?: any;
  options: Option[];
  centered?: boolean;
}

export function Tabs({ handleChange, options, centered }: TabsProps) {
  return (
    <TabsChakra onChange={handleChange} align={centered ? 'center' : 'start'}>
      <TabList>
        {options.map((option) => {
          return <Tab key={option.key}>{option.title}</Tab>;
        })}
      </TabList>

      <TabPanels>
        {options.map((option) => {
          return <TabPanel key={option.key}>{option.content}</TabPanel>;
        })}
      </TabPanels>
    </TabsChakra>
  );
}

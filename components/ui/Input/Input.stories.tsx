import React from 'react';

import Input from '.';

export default {
  component: Input,
  title: 'Input',
};

const Template = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  label: 'Default input',
  value: '',
  onChange: () => {
    console.log('handle change');
  },
  onBlur: () => {
    console.log('handle onblur change');
  },
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'Password input',
  value: '',
  showPlainPassword: true,
  onChange: () => {
    console.log('handle change');
  },
  onBlur: () => {
    console.log('handle onblur change');
  },
};

// src/components/Task.stories.js

import React from 'react';

import Alert from '.';

export default {
  component: Alert,
  title: 'Alert',
};

const Template = args => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'red',
  message: 'Alert Message',
  handleClose: () => {
    console.log('handle close');
  },
};

import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '..';

describe('Button', () => {
  it('renders correctly', () => {
    const { container } = render(<Button type="button">Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });
});

import { InMemoryCache, gql } from '@apollo/client';
import React from 'react';
import Index from '../pages';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

const cache = new InMemoryCache();
cache.writeQuery({
  query: gql`
    query Viewer {
      viewer {
        id
        name
        status
      }
    }
  `,
  data: {
    viewer: {
      __typename: 'User',
      id: 'Baa',
      name: 'Baa',
      status: 'Healthy',
    },
  },
});

describe('Index', () => {
  it('renders the html we want', async () => {
    const { container } = render(
      <MockedProvider cache={cache}>
        <Index />
      </MockedProvider>
    );
    expect(container.firstChild).toMatchInlineSnapshot();
  });
});

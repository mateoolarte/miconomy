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
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <h1
          class="pages__Title-of3loo-0 jvuHSB"
        >
          My page Biatch
        </h1>
        <span>
          Signed in as 
          Baa
           and status: 
          Healthy
          .
        </span>
        <div>
          <input
            placeholder="your new name..."
            type="text"
          />
          <input
            type="button"
            value="change"
          />
        </div>
      </div>
    `);
  });
});

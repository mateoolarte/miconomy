import { useState } from 'react';
import {
  useViewerQuery,
  useUpdateNameMutation,
  ViewerDocument,
} from '../lib/viewer.graphql';
import { initializeApollo } from '../lib/apollo';

const Index = () => {
  const { viewer } = useViewerQuery().data;
  const [newName, setNewName] = useState('');
  const [updateNameMutation] = useUpdateNameMutation();

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      //Follow apollo suggestion to update cache
      //https://www.apollographql.com/docs/angular/features/cache-updates/#update
      update: (
        store,
        {
          data: {
            updateName: { name },
          },
        }
      ) => {
        // Read the data from our cache for this query.
        const { viewer } = store.readQuery({ query: ViewerDocument });
        const newViewer = { ...viewer };
        // Add our comment from the mutation to the end.
        newViewer.name = name;
        // Write our data back to the cache.
        store.writeQuery({
          query: ViewerDocument,
          data: { viewer: newViewer },
        });
      },
    });
  };

  return (
    <div>
      <span>
        Signed in as {viewer.name} and status: {viewer.status}.
      </span>
      <div>
        <input
          data-cy="email-field"
          type="text"
          placeholder="your new name..."
          onChange={e => setNewName(e.target.value)}
        />
        <input
          type="button"
          value="change"
          data-cy="login-btn"
          onClick={onChangeName}
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
        />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;

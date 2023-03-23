import { createYoga } from 'graphql-yoga';
import { createContext } from '../../config/context';
import { schema } from '../../graphql/api/schema';

export default createYoga({
  schema,
  context: ({ req }) => createContext(req),
  graphqlEndpoint: '/api/graphql',
});

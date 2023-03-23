import { nonNull, stringArg, mutationField } from 'nexus';
import { Auth } from './resolvers';

export const login = mutationField('login', {
  type: nonNull('AuthPayload'),
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, args, { db }) {
    return Auth.login(args, db);
  },
});

export const signup = mutationField('signup', {
  type: nonNull('AuthPayload'),
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, args, { db }) {
    return Auth.signup(args, db);
  },
});

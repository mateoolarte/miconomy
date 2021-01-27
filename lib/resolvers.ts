import { QueryResolvers, MutationResolvers } from './type-defs.graphqls';
import { ResolverContext } from './apollo';

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
};

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer() {
    return userProfile;
  },
};

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, _args) {
    userProfile.name = _args.name;
    return userProfile;
  },
};

export default { Query, Mutation };

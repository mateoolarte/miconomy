import { makeSchema } from 'nexus';
import path from 'path';
import * as types from '.';

export const schema = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

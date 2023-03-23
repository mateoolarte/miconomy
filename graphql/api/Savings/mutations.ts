import { mutationField, nonNull } from 'nexus';
import { Saving } from './resolvers';

export const createSaving = mutationField('createSaving', {
  type: nonNull('Saving'),
  args: {
    name: nonNull('String'),
    goal: nonNull('Int'),
    value: 'Int',
    type: 'String',
  },
  async resolve(_root, args, { db, user }) {
    return Saving.createSaving(db, user, args);
  },
});

export const updateSaving = mutationField('updateSaving', {
  type: nonNull('Saving'),
  args: {
    id: nonNull('Int'),
    name: nonNull('String'),
    goal: nonNull('Int'),
    value: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Saving.updateSaving(db, user, args);
  },
});

export const deleteSaving = mutationField('deleteSaving', {
  type: nonNull('Saving'),
  args: {
    id: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Saving.deleteSaving(db, user, args);
  },
});

export const sendSaving = mutationField('sendSaving', {
  type: nonNull('Saving'),
  args: {
    id: nonNull('Int'),
    value: nonNull('Int'),
    entryId: nonNull('Int'),
  },
  async resolve(_root, args, { db, user }) {
    return Saving.sendSaving(db, user, args);
  },
});

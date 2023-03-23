import { gql } from '@apollo/client';

export const SEND_SAVING = gql`
  mutation sendSaving($id: Int!, $value: Int!, $entryId: Int!) {
    sendSaving(id: $id, value: $value, entryId: $entryId) {
      id
      name
      value
      goal
      type
    }
  }
`;

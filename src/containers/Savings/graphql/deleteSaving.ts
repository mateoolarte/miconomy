import { gql } from '@apollo/client';

export const DELETE_SAVING = gql`
  mutation deleteSaving($id: Int!) {
    deleteSaving(id: $id) {
      id
      name
      value
      goal
      fee
      type
    }
  }
`;

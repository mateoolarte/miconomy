import { gql } from '@apollo/client';

export const UPDATE_SAVING = gql`
  mutation updateSaving($id: Int!, $name: String!, $goal: Int!, $value: Int!) {
    updateSaving(id: $id, name: $name, goal: $goal, value: $value) {
      id
      name
      value
      goal
      fee
      type
    }
  }
`;

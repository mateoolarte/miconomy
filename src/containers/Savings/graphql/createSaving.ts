import { gql } from '@apollo/client';

export const CREATE_SAVING = gql`
  mutation createSaving($name: String!, $goal: Int!, $value: Int!) {
    createSaving(name: $name, goal: $goal, value: $value) {
      id
      name
      value
      goal
      type
    }
  }
`;

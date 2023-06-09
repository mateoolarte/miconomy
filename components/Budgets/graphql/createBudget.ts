import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
  mutation createBudget($name: String!) {
    createBudget(name: $name) {
      id
      name
    }
  }
`;

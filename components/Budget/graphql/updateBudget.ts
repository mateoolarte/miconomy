import { gql } from '@apollo/client';

export const UPDATE_BUDGET = gql`
  mutation updateBudget($id: Int!, $name: String!) {
    updateBudget(id: $id, name: $name) {
      id
      name
      categories {
        id
        name
        amount
      }
      savings {
        id
        name
        fee
      }
    }
  }
`;

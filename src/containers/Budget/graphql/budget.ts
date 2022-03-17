import { gql } from '@apollo/client';

export const BUDGET = gql`
  query budget($id: Int!) {
    budget(id: $id) {
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

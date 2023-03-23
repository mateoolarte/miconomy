import { gql } from '@apollo/client';

export const BALANCE = gql`
  query balance($entryId: Int!) {
    balance(entryId: $entryId) {
      incomes {
        id
        value
      }
      expenses {
        id
        description
        value
        updatedAt
      }
    }
  }
`;

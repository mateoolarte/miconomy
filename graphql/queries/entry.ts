import { gql } from '@apollo/client';

export const ENTRY = gql`
  query entry($month: Int!, $year: Int!) {
    entry(month: $month, year: $year) {
      id
      categories {
        id
        name
        amount
        expenses {
          id
          description
          value
          updatedAt
        }
      }
      savings {
        id
        name
        type
        fee
        sent
      }
    }
  }
`;

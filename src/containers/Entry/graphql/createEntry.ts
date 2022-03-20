import { gql } from '@apollo/client';

export const CREATE_ENTRY = gql`
  mutation createEntry($month: Int!, $year: Int!, $budgetId: Int!) {
    createEntry(month: $month, year: $year, budgetId: $budgetId) {
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
    }
  }
`;

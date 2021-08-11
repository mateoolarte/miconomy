import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
  mutation addExpense($itemId: Int!, $value: Int!, $description: String!) {
    addExpense(itemId: $itemId, value: $value, description: $description) {
      id
      value
      description
      date
    }
  }
`;

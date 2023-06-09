import { gql } from '@apollo/client';

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: Int!, $description: String!, $value: Int!) {
    updateExpense(id: $id, description: $description, value: $value) {
      id
      description
      value
      updatedAt
    }
  }
`;

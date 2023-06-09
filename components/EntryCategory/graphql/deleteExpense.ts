import { gql } from '@apollo/client';

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: Int!) {
    deleteExpense(id: $id) {
      id
      description
      value
      updatedAt
    }
  }
`;

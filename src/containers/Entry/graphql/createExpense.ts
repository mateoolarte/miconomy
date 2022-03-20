import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
  mutation createExpense(
    $value: Int!
    $description: String!
    $entryId: Int!
    $categoryId: Int!
  ) {
    createExpense(
      value: $value
      description: $description
      entryId: $entryId
      categoryId: $categoryId
    ) {
      id
      description
      value
      updatedAt
    }
  }
`;

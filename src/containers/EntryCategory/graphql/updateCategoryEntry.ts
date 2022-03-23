import { gql } from '@apollo/client';

export const UPDATE_CATEGORY_ENTRY = gql`
  mutation updateCategoryEntry(
    $entryId: Int!
    $categoryId: Int!
    $amount: Int!
  ) {
    updateCategoryEntry(
      entryId: $entryId
      categoryId: $categoryId
      amount: $amount
    ) {
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
`;

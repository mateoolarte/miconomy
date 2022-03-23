import { gql } from '@apollo/client';

export const ENTRY_CATEGORY = gql`
  query entryCategory($categoryId: Int!, $entryId: Int!) {
    entryCategory(categoryId: $categoryId, entryId: $entryId) {
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

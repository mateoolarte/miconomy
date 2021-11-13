import { gql } from '@apollo/client';

export const GET_USER_CATEGORIES = gql`
  query getUserCategories {
    getUserCategories {
      status
      error
      categories {
        id
        name
        isActive
      }
    }
  }
`;

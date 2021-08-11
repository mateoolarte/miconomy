import { gql } from '@apollo/client';

export const GET_USER_MONTH_CATEGORIES = gql`
  query getUserMonthCategories($userMonthId: Int!) {
    getUserMonthCategories(userMonthId: $userMonthId) {
      id
      category {
        id
        name
      }
      items {
        id
        description
      }
    }
  }
`;

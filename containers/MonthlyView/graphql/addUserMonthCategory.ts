import { gql } from '@apollo/client';

export const ADD_USER_MONTH_CATEGORY = gql`
  mutation addUserMonthCategory($categoryId: Int!, $userMonthId: Int!) {
    addUserMonthCategory(categoryId: $categoryId, userMonthId: $userMonthId) {
      id
      name
      isActive
    }
  }
`;

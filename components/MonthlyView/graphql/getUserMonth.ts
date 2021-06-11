import { gql } from '@apollo/client';

export const GET_USER_MONTH = gql`
  query getUserMonth($month: Int!, $year: Int!) {
    getUserMonth(month: $month, year: $year) {
      id
      status
      error
      categories {
        id
        category {
          id
          name
          isActive
        }
        items {
          id
          description
          itemBudget
          expense {
            id
            value
            description
            date
          }
        }
      }
      savingCategories {
        id
        userMonthSavingItems {
          id
          value
          sent
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const OVERVIEW_MONTH = gql`
  query overviewMonth($month: String!) {
    overviewMonth(month: $month) {
      status
      error
      incomes {
        id
        value
        date
        description
      }
      available
      lastExpense {
        id
        value
        description
        date
      }
      notInBudget
      savings
    }
  }
`;

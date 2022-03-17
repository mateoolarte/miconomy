import { gql } from '@apollo/client';

export const UPDATE_SAVING_BUDGET = gql`
  mutation updateSavingBudget($budgetId: Int!, $savingId: Int!, $fee: Int!) {
    updateSavingBudget(budgetId: $budgetId, savingId: $savingId, fee: $fee) {
      id
      name
      fee
    }
  }
`;

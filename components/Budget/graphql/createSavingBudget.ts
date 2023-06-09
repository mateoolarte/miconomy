import { gql } from '@apollo/client';

export const CREATE_SAVING_BUDGET = gql`
  mutation createSavingBudget($budgetId: Int!, $savingId: Int!, $fee: Int!) {
    createSavingBudget(budgetId: $budgetId, savingId: $savingId, fee: $fee) {
      id
      name
      fee
    }
  }
`;

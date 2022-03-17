import { gql } from '@apollo/client';

export const DELETE_SAVING_BUDGET = gql`
  mutation deleteSavingBudget($budgetId: Int!, $savingId: Int!) {
    deleteSavingBudget(budgetId: $budgetId, savingId: $savingId) {
      id
      name
      fee
    }
  }
`;

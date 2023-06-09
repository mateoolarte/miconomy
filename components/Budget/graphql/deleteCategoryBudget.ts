import { gql } from '@apollo/client';

export const DELETE_CATEGORY_BUDGET = gql`
  mutation deleteCategoryBudget($budgetId: Int!, $categoryId: Int!) {
    deleteCategoryBudget(budgetId: $budgetId, categoryId: $categoryId) {
      id
      name
      amount
    }
  }
`;

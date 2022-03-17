import { gql } from '@apollo/client';

export const UPDATE_CATEGORY_BUDGET = gql`
  mutation updateCategoryBudget(
    $budgetId: Int!
    $categoryId: Int!
    $amount: Int!
  ) {
    updateCategoryBudget(
      budgetId: $budgetId
      categoryId: $categoryId
      amount: $amount
    ) {
      id
      name
      amount
    }
  }
`;

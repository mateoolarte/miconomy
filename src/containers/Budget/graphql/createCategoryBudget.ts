import { gql } from '@apollo/client';

export const CREATE_CATEGORY_BUDGET = gql`
  mutation createCategoryBudget(
    $budgetId: Int!
    $categoryId: Int!
    $amount: Int!
  ) {
    createCategoryBudget(
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

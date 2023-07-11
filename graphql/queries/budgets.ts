import { gql } from '@apollo/client';

export const BUDGETS = gql`
  query budgets {
    budgets {
      id
      name
    }
  }
`;

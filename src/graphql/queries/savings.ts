import { gql } from '@apollo/client';

export const SAVINGS = gql`
  query savings {
    savings {
      id
      name
      value
      goal
      type
    }
  }
`;

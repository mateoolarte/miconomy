import { gql } from '@apollo/client';

export const ADD_INCOME = gql`
  mutation addIncome($userMonthId: Int!, $value: Int!, $description: String!) {
    addIncome(
      userMonthId: $userMonthId
      value: $value
      description: $description
    ) {
      id
      value
      description
      date
    }
  }
`;

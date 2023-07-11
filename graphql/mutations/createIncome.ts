import { gql } from '@apollo/client';

export const CREATE_INCOME = gql`
  mutation createIncome($value: Int!, $description: String!, $entryId: Int!) {
    createIncome(value: $value, description: $description, entryId: $entryId) {
      id
      value
    }
  }
`;

import { gql } from '@apollo/client';

export const DEL_USER = gql`
  mutation deleteUser($token: String!) {
    deleteUser(token: $token) {
      status
      message
    }
  }
`;

import { gql } from '@apollo/client';

export const CHANGE_PASS = gql`
  mutation changePassword($token: String!, $password: String!) {
    updatePassword(token: $token, password: $password) {
      status
      message
    }
  }
`;

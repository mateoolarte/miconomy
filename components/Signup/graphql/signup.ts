import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
        password
        currencyCode
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const USER = gql`
  query getUser($token: String!) {
    getUser(token: $token) {
      id
      name
      email
      password
    }
  }
`;

import { gql } from '@apollo/client';

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
      name
    }
  }
`;

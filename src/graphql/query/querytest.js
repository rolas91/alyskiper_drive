import { gql } from 'apollo-boost';

export const DataTest = gql`
  {
    categories {
        cover
    }
  }
`;
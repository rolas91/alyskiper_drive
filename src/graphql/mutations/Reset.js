import { gql } from 'apollo-boost'

export const RESET = gql`
  mutation Reset($phone_number: String!){
    reset_password (phone_number: $phone_number) {
      error {
        message
        ok
        status
      }
      data {
        id
      }
    }
  }
`
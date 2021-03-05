import { gql } from 'apollo-boost'

export const Updateavatar = gql`
  mutation Updateavatar($input: UserUpdateInput!){
    updateUser (input: $input) {
      avatar
    }
  }
`
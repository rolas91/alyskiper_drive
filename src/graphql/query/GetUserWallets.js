import { gql } from 'apollo-boost';

export const GetUserWallets = gql`
  query Obtenerwallets ($id: Int!){
    GetUserWallets(id: $id){
      id
      skiperWallet {
        id
        amount
        currencyID {
          id
          name
        }
        date_in
      }
    }
  }
`
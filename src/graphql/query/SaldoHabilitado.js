import { gql } from 'apollo-boost';

export const getSaldoHabilitado = gql`
query getSaldoHabilitado($id: Int!) {
    searchSkiperWallet(id: $id){
        amount
        minimun
    }
}
`;
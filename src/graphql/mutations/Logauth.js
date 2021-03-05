import { gql } from 'apollo-boost';

export const Logout = gql`
mutation cerrarsesion($id: Int!){
    logout(id: $id)
}`;
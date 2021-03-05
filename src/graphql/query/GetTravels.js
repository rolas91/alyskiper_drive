import { gql } from 'apollo-boost';

export const GetTravels = gql`
  query GetTravels($idagent: Int!, $idstatus: [Int!]!) {
    getTravelsByUserId(idagent: $idagent, idstatus: $idstatus) {
      id
      lat_initial
      lng_initial
      lat_final
      lng_final
      date_init
      distance
      total
      duration
      address_initial
      address_final
      users {
        id
        firstname
        lastname
      }
      skiperTravelsTracing {
        id
        datetracing
        travelstatus {
          id
          name
          codigo
        }
      }  
    }
  }
`;
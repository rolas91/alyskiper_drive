import { gql } from 'apollo-boost';

export const GetTravelby = gql`
  query GetTravelby($idagent: Int!) {
    getTravels(idagent: $idagent) {
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
      skiperagent {
        id
        identity
        state
      }
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
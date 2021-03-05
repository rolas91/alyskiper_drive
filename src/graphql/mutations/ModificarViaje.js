import { gql } from 'apollo-boost';

export const ModificarViaje = gql`
mutation ModificarViaje(
  $idtravel: Int!
  $idtravelstatus: String!
  $lat: Float!
  $lng: Float!) {
  registerTravelsTracing(input: {
    idtravel: $idtravel, 
    idtravelstatus: $idtravelstatus,
    lat: $lat
    lng: $lng
    })
  {
    id
    datetracing
  }
}`;


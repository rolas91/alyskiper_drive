import { gql } from 'apollo-boost';

export const Ganancias = gql`
query Ganancias($idwallet: Int!, $lat: Float!, $lng: Float!, $flat: Boolean) {
  getGanaciaDelDia(idwallet: $idwallet, lat: $lat, lng: $lng, flat: $flat){
    ganancia
    viajes
  }
}
`;
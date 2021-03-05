import { gql } from 'apollo-boost';

export const CalcularTarifa = gql`
  query CaculateRate ($idcountry: Int!, $idcity: Int!, $idcategoriaviaje: Int!, $date_init: DateTime!){
    CalcularTarifa(idcountry: $idcountry, idcity: $idcity, idcategoriaviaje: $idcategoriaviaje, date_init: $date_init){
      pricebase
      priceminute
      priceckilometer
      priceminimun
    }
  }
`
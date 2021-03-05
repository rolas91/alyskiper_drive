import { gql } from 'apollo-boost'

export const COUNTRIES = gql`
  query {
    countries {
      id
      name
      phonecode
      flag
    }
  }
`
export const COMMERCERS = gql`
  query Commerces ($latitud: Float!, $longitud: Float!, $radio: Int!, $id_category_product: Int) {
    CommercesIntoRadio (latitud: $latitud, longitud: $longitud, radio: $radio, id_category_product: $id_category_product) {
      id
      namecommerce
      lat
      lon
      url_art
      url_logo
      address
      skiperCatProductsCommerce{
        id
        name
        description
        skiperProductCommerce {
          id
          name
          url_img_product
          description
          price
          optionAddon {
            id
            name
            description
            extraPrice
          }
        }
      }
    }
  }
`
export const CALCULATERATE = gql`
  query CaculateRate ($idcountry: Int!, $idcity: Int!, $idcategoriaviaje: Int!, $date_init: DateTime!){
    CalcularTarifa(idcountry: $idcountry, idcity: $idcity, idcategoriaviaje: $idcategoriaviaje, date_init: $date_init){
      pricebase
      priceminute
      priceckilometer
      priceminimun
    }
  }
`

export const CATEGORY = gql`
  query {
    getAllSkiperSubCatCommerce{
      id
      name
      url_img
    }
  }
`

export const GETDRIVERNEARBY = gql`
  query GetDriverNearby ($lat: Float!, $lng: Float!, $inputdrive: [AgentDriveInput!]!) {
    ObtenerDriveCercano(lat: $lat, lng: $lng, inputdrive: $inputdrive)
  }
`

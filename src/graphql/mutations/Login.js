import { gql } from 'apollo-boost';

export const SINGIN = gql`
mutation IniciarSesion($email: String!, $password: String!){
  signin(input: {email: $email, password: $password }) {
    data {
      token
      firstname
      lastname
      username
      email
      phone_number
      avatar
      country {
        name
        id
        iso
      }
      city {
        id
        name
      }
      vehicle {
        id
        license_plate
        skiperVehicleAgent {
          id
          skiperAgent {
            id
          }
        }
        skiperCatTravel {
          id
          name
          mode_drive
          url_img_drive
        }
        vehicleCatalog {
          id
          name
        }
        vehicleTrademark {
          id
          name
        }
        vehicleModel {
          id
          name
        }
        vehicleYear {
          id
          year
        }
      }
    },
    error{
      message,
      status
      ok
    }
  }
}`;


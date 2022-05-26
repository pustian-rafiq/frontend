import { gql } from "@apollo/client";
// query
export const GET_SHOP_LIST = gql`
  query {
    me {
      consumers {
        username
        shops {
          edges {
            node {
              logo
              shopImage

              sliderImage1
              sliderImage2
              sliderImage3
              sliderImage4

              id
              name
              slug
              email
              phone

              consumer {
                username
                id
              }

              country {
                id
                name
              }

              divisionOrState {
                id
                name
              }

              districtOrCity {
                id
                name
              }

              policeStation {
                id
                name
              }

              subDistrict {
                id
                name
              }

              roadOrStreetNo {
                id
                name
              }

              postoffice {
                id
                zipcode
                name
              }

              municipality {
                id
                name
              }

              union {
                id
                name
              }

              wordNo {
                id
                number
              }

              village {
                id
                name
              }

              mahalla
              block
              holdingNo
              house
            }
          }
        }
      }
    }
  }
`;

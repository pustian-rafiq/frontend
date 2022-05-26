import { gql } from "@apollo/client";

export const USE_All_LOCATION =gql`
query{
  continents {
    edges {
      node {
        id
        name
        countries {
          edges {
            node {
              name
              id
              divisionOrStates{
                edges{
                  node{
                    name
                    id
                    
                    districtOrCities{
                      edges{
                        node{
                          name
                          id
                          
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  

`


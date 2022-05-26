import { gql } from "@apollo/client";

// query
export const use_continent_withCountry = gql`
  {
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
            }
          }
        }
      }
    }
  }
}

`;


export const Use_Country_Division =gql`
query($id:ID!) {
  country(id:$id){
		      	id,
            name,
            divisionOrStates{
                edges{
                    node{
                        id
                        name
                    }
                }
            },
           
        }
    }
  

` 


export const Use_City_Division =gql`
query($id:ID!) {
  divisionOrState(id:$id){
        id
        name
        districtOrCities{
            edges{
                node{
                    id 
                    name
                }
            }
        }
      }
    }


  ` 
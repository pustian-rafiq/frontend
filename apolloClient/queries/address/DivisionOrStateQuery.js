import { gql } from "@apollo/client";


const GET_COUNTRY_BY_CONTINENT = gql`
query($id: ID!) {
  divisionOrState(id: $id){
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
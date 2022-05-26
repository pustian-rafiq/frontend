import { gql } from "@apollo/client";


export const GET_COUNTRY_DETAILS = gql`
 query($id: ID!){
  country(id: $id){
			id,
            name,
            divisionOrStates{
                edges{
                    node{
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
            },        
        }
    }
`;
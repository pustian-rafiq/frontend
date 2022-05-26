import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";


export const GET_MARKETING_POLICIES=gql`
query{
  marketingPolicies{
    edges{
      node{
         id 
        title
        description     
      }
    }
  }
}
`

const useMaeketingPolics = async() =>{
    const data =client.query({
      query:GET_MARKETING_POLICIES
    });

    return data ;
}

export default useMaeketingPolics;
import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

export const GET_TERMS=gql`
query{
  termConditions{
    edges{
      node{
         id
        title
        description
        isActive
        
      }
    }
  }
}
`
const useTermsConditions = async () => {
  const data = client.query({ query: GET_TERMS });
  return data;
};

export default useTermsConditions;
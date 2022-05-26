import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

export const GET_COMMISION=gql`
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
const useallcommision = async () => {
  const data = client.query({ query: GET_COMMISION });
  return data;
};

export default useallcommision;
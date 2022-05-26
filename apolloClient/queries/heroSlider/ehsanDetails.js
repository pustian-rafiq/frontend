import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_EHSANDETAILS = gql`
query{
  managementNode{
    edges{
      node{
        name
        id
        organization
        designation1
        designation2
        image
      }
    }
  }
}
`;

const useEhsanDetails = async () => {
  const data = client.query({ query: GET_EHSANDETAILS });
  return data;
};

export default useEhsanDetails;
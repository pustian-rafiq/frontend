import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_SEARCH_CONSUMERS_RIGHT = gql`
  query {
    rightSliderConsumers {
      edges {
        node {
          id
          username
          user {
            lastName
            firstName
          }
          isMaster
          rank
          country {
            name
          }
        }
      }
    }
  }
`;

//show this data in the index page by MimHakkani
const useSearchConsumers = async () => {
  const data = await client.query({ query: GET_SEARCH_CONSUMERS_RIGHT });
  return data;
};

export default useSearchConsumers;

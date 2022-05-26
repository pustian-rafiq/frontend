import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";


// query
export const GET_VAT_GST_LIST = gql`
  query ($first: Int, $after: String) {
    vats(first: $first, after: $after) {
      edges {
        node {
          id
          county
          city
          country {
            name
          }
          percentageAmt
          sector
          state
          description
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
    }
  }
`;

const useVatGstList = async () => {
  // const { loading, error, data } = useQuery(GET_VAT_GST_LIST);

  const { data } = await client.query({
    query: GET_VAT_GST_LIST,
    fetchPolicy: "network-only",
  });

  return {
    // loading,
    // error,
    data,
  };
};

export default useVatGstList;

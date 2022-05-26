import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_PRODUCT_UNITS = gql`
  query {
    productUnits {
      edges {
        node {
          id
          unitName
          description
        }
      }
    }
  }
`;

const useProductUnits = async () => {
  const productUnits = await client.query({
    query: GET_PRODUCT_UNITS,
    fetchPolicy: "network-only",
  });

  return productUnits;
};

export default useProductUnits;

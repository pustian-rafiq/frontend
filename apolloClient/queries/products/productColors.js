import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_PRODUCT_COLORS = gql`
  query {
    colors {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const useProductColors = async () => {
  const productColors = await client.query({
    query: GET_PRODUCT_COLORS,
    fetchPolicy: "network-only",
  });

  return productColors;
};

export default useProductColors;

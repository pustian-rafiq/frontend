import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";


// query
export const GET_PRODUCTS_NAME = gql`
  query {
    products {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const useProductsName = async () => {
  const data = client.query({ query: GET_PRODUCTS_NAME });

  return data;
};

export default useProductsName;

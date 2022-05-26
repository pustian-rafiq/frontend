import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_CATEGORY = gql`
  query {
    categories {
      edges {
        node {
          id
          name
          image
          subcategories {
            edges {
              node {
                id
                name
                subsubcategories {
                  edges {
                    node {
                      name
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const useAllCategory = async () => {
  const data = await client.query({ query: GET_CATEGORY });

  return data;
};

export default useAllCategory;

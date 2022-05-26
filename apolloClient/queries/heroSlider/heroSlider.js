import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_SLIDERS = gql`
  query {
    sliders(first: 5) {
      edges {
        node {
          id
          isActive
          title
          image
          product {
            name
          }
        }
      }
    }
  }
`;

const useHeroslider = async () => {
  const data = client.query({ query: GET_SLIDERS });
  return data;
};

export default useHeroslider;

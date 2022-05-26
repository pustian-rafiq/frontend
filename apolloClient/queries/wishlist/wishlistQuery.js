import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_WISHLISTS = gql`
  query {
    me {
      consumers {
        id
        username
        wishlists {
          id
          productCount
          products {
            edges {
              node {
                id
                name
                productImage
                quantity
                sellPrice
                sellPriceDolar
                productoffer {
                  id
                  amount
                  conditionAmount
                }
                originCountry {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const useWishlistsOnClientSide = (token) => {
  const { data, loading, error } = useQuery(GET_WISHLISTS, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    wishLists: data,
    wishListsLoading: loading,
    wishListsError: error,
  };
};

const useWishlists = async () => {
  const data = client.query({ query: GET_WISHLISTS });

  return data;
};

export default useWishlists;

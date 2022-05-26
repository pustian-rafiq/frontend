import { gql, useMutation } from "@apollo/client";
import { GET_WISHLISTS } from "../../queries/wishlist/wishlistQuery";

export const CREATE_WISHLIST = gql`
  mutation ($productId: ID!) {
    wishListAdd(input: { productId: $productId }) {
      wishList {
        id
        consumer {
          id
          username
        }
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
`;

const useCreateWishlist = (token) => {
  const [addToWishListMutationHandler, { data, loading, error }] = useMutation(
    CREATE_WISHLIST,
    {
      refetchQueries: [
        {
          query: GET_WISHLISTS,
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        },
      ],
    }
  );
  return {
    addToWishListMutationHandler,
    data,
    loading,
    error,
  };
};

export default useCreateWishlist;

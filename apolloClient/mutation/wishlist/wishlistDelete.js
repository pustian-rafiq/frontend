import { gql, useMutation } from "@apollo/client";
import { GET_WISHLISTS } from "../../queries/wishlist/wishlistQuery";

export const DELETE_WISHLIST = gql`
  mutation ($productId: ID!) {
    wishListDelete(productId: $productId) {
      wishList{
      id 
      productCount
      products{
          edges{
              node{
                  id
                  name
                   productImage
              quantity
              sellPrice
              sellPriceDolar
              productoffer{
                  id
                  amount
                  conditionAmount
              }
              originCountry{
                  name
              }
              }
          }
      }
    }
    }
  }
`;

const useDeleteWishlist = () => {
  const [wishListDelete, { data, loading, error }] = useMutation(DELETE_WISHLIST, {
    refetchQueries: [
      GET_WISHLISTS, // DocumentNode object parsed with gql
    ],
  });
  return {
    wishListDelete,
    deleteData : data,
    deleteloading : loading,
    deleteerror: error,
  };
};

export default useDeleteWishlist;

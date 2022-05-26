import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCT_OFFERS } from "../../../queries/products/productOffers";

export const DELETE_PRODUCT_OFFER = gql`
  mutation ($id: ID!) {
    productOfferDelete(id: $id) {
      message
    }
  }
`;

const useDeleteProductOffer = () => {
  const [productOfferDelete, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_OFFER,
    {
      refetchQueries: [
        GET_PRODUCT_OFFERS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    productOfferDelete,
    data,
    loading,
    error,
  };
};

export default useDeleteProductOffer;

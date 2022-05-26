import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCT_OFFERS } from "../../../queries/products/productOffers";

export const UPDATE_PRODUCT_UNIT = gql`
  mutation (
    $id: ID
    $name: String!
    $amount: Float!
    $conditionAmount: Float!
    $description: String!
  ) {
    productOfferCreateOrUpdate(
      input: {
        id: $id
        name: $name
        amount: $amount
        conditionAmount: $conditionAmount
        description: $description
      }
    ) {
      productOffer {
        id
        name
        amount
        conditionAmount
        description
      }
    }
  }
`;
const useCreateUpdateOffer = () => {
  const [productOfferCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_PRODUCT_UNIT,
    {
      refetchQueries: [
        GET_PRODUCT_OFFERS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    productOfferCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useCreateUpdateOffer;

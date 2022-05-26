import { gql, useMutation } from "@apollo/client";
import { GET_CURRENT_USER_PRODUCTS } from "../../queries/products/currentUserProducts";

export const DELETE_PRODUCT = gql`
  mutation ($id: ID!) {
    productDelete(id: $id) {
      message
    }
  }
`;

const useDeleteProduct = () => {
  const [productDelete, { data, loading, error }] = useMutation(
    DELETE_PRODUCT,
    {
      refetchQueries: [
        GET_CURRENT_USER_PRODUCTS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    productDelete,
    data,
    loading,
    error,
  };
};

export default useDeleteProduct;

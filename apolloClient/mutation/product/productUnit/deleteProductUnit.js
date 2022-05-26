import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCT_UNITS } from "../../../queries/products/productUnits";

export const DELETE_PRODUCT_UNIT = gql`
  mutation ($id: ID!) {
    productUnitDelete(id: $id) {
      message
    }
  }
`;

const useDeleteProductUnit = () => {
  const [productUnitDelete, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_UNIT,
    {
      refetchQueries: [
        GET_PRODUCT_UNITS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    productUnitDelete,
    data,
    loading,
    error,
  };
};

export default useDeleteProductUnit;

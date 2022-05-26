import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCT_UNITS } from "../../../queries/products/productUnits";

export const UPDATE_PRODUCT_UNIT = gql`
  mutation ($id: ID, $unitName: String!, $description: String!) {
    productUnitCreateOrUpdate(
      input: { id: $id, unitName: $unitName, description: $description }
    ) {
      productUnit {
        id
        unitName
        description
      }
    }
  }
`;
const useCreateUpdateUnit = () => {
  const [productUnitCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_PRODUCT_UNIT,
    {
      refetchQueries: [
        GET_PRODUCT_UNITS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    productUnitCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useCreateUpdateUnit;

import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCT_COLORS } from "../../../queries/products/productColors";

export const CREATE_PRODUCT_COLOR = gql`
  mutation ($id: ID, $name: String!) {
    colorCreateOrUpdate(input: { id: $id, name: $name }) {
      color {
        id
        name
      }
    }
  }
`;
const useCreateUpdateColor = () => {
  const [colorCreateOrUpdate, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_COLOR,
    {
      refetchQueries: [
        GET_PRODUCT_COLORS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    colorCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useCreateUpdateColor;

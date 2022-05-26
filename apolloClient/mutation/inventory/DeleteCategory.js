import { gql, useMutation } from "@apollo/client";
import { GET_VAT_GST_LIST } from "../../queries/vatGst/vatGstListQuery";

export const DELETE_CATEGORY = gql`
  mutation ($id: ID!) {
    categoryDelete(id: $id) {
      category {
        id
      }
    }
  }
`;

const useDeleteCategory = () => {
  const [categoryDeleteMutation, { data, loading, error, reset }] =
    useMutation(DELETE_CATEGORY);
  return {
    categoryDeleteMutation,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteCategory;

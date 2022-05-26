import { gql, useMutation } from "@apollo/client";

export const DELETE_SUBCATEGORY = gql`
  mutation ($id: ID!) {
    subCategoryDelete(id: $id) {
      subCategory {
        id
      }
    }
  }
`;

const useDeleteSubCategory = () => {
  const [subCategoryDeleteMutation, { data, loading, error, reset }] =
    useMutation(DELETE_SUBCATEGORY);
  return {
    subCategoryDeleteMutation,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteSubCategory;

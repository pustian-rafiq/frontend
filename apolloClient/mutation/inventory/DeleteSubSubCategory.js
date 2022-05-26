import { gql, useMutation } from "@apollo/client";

export const DELETE_SUB_SUBCATEGORY = gql`
  mutation ($id: ID!) {
    subSubCategoryDelete(id: $id) {
      subSubCategory {
        id
      }
    }
  }
`;

const useDeleteSubSubCategory = () => {
  const [subSubCategoryDeleteMutation, { data, loading, error, reset }] =
    useMutation(DELETE_SUB_SUBCATEGORY);
  return {
    subSubCategoryDeleteMutation,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteSubSubCategory;

import { gql, useMutation } from "@apollo/client";

export const UPDATE_SUB_SUBCATEGORY = gql`
  mutation (
    $id: ID!
    $name: String!
    $subCategoryId: ID!
    $slug: String!
    $photo: Upload
  ) {
    subSubCategoryMutation(
      input: {
        id: $id
        name: $name
        subCategoryId: $subCategoryId
        slug: $slug
        image: $photo
      }
    ) {
      subSubCategory {
        id
        name
        slug 
      }
    }
  }
`;

const useUpdateSubSubCategory = () => {
  const [subSubCategoryMutationHandler, { data, loading, error }] = useMutation(UPDATE_SUB_SUBCATEGORY);
  return {
    subSubCategoryMutationHandler,
    data,
    loading,
    error,
  };
};

export default useUpdateSubSubCategory;

import { gql, useMutation } from "@apollo/client";

export const UPDATE_SUBCATEGORY = gql`
  mutation (
    $id: ID!
    $name: String!
    $categoryId: ID!
    $slug: String!
    $photo: Upload
  ) {
    subCategoryMutation(
      input: {
        id: $id
        name: $name
        categoryId: $categoryId
        slug: $slug
        image: $photo
      }
    ) {
      subCategory {
        id
        name
        slug 
      }
    }
  }
`;

const useUpdateSubCategory = () => {
  const [subCategoryUpdateMutationHandler, { data, loading, error }] = useMutation(UPDATE_SUBCATEGORY);
  return {
    subCategoryUpdateMutationHandler,
    data,
    loading,
    error,
  };
};

export default useUpdateSubCategory;

import { gql, useMutation } from "@apollo/client";

const SUB_CATEGORY_ADD = gql`
  mutation subCategoryAdd(
    $subCategory: String!
    $slug: String!
    $category: ID!
    $photo: Upload
  ) {
    subCategoryMutation(
      input: {
        name: $subCategory
        categoryId: $category
        slug: $slug
        image: $photo
      }
    ) {
      subCategory {
        name
      }
    }
  }
`;

const useSubCategoryMutation = () =>  {
  const [subCategoryMutationHandler, { loading, error, data }] =
    useMutation(SUB_CATEGORY_ADD);

  return { subCategoryMutationHandler, loading, error, data };
};

 export default useSubCategoryMutation;

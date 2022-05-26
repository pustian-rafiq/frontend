import { gql, useMutation } from "@apollo/client";

const SUB_SUBCATEGORY_ADD = gql`
  mutation subSubCategoryAdd(
    $name: String!
    $subCategoryId: ID!
    $slug: String!
    $photo: Upload
  ) {
    subSubCategoryMutation(
      input: {
        name: $name
        subCategoryId: $subCategoryId
        slug: $slug
        image: $photo
      }
    ) {
      subSubCategory {
        name
      }
    }
  }
`;

const useSubsubCategoryMutation = () =>  {
  const [subsubCategoryMutationHandler, { loading, error, data }] =
    useMutation(SUB_SUBCATEGORY_ADD);

  return { subsubCategoryMutationHandler, loading, error, data };
};

 export default useSubsubCategoryMutation;

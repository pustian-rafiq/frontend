import { gql, useMutation } from "@apollo/client";

const CATEGORY_ADD = gql`
  mutation categoryAdd(
    $name: String!
    $slug: String!
    $icon: String
    $photo: Upload
  ) {
    categoryMutation(
      input: {
        name: $name
        slug: $slug
        icon: $icon
        image: $photo
      }
    ) {
      category {
        id
        name
        slug 
        icon
      }
    }
  }
`;

const useCategoryMutation = () =>  {
  const [categoryMutationHandler, { loading, error, data }] =
    useMutation(CATEGORY_ADD);

  return { categoryMutationHandler, loading, error, data };
};

 export default useCategoryMutation;

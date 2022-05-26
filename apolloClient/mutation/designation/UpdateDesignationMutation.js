import { gql, useMutation } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation (
    $id: ID!
    $name: String!
    $slug: String!
    $icon: String!
    $photo: Upload!
  ) {
    categoryMutation(
      input: {
        id: $id
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

const useUpdateCategory = () => {
  const [categoryMutationHandler, { data, loading, error }] = useMutation(UPDATE_CATEGORY);
  return {
    categoryMutationHandler,
    data,
    loading,
    error,
  };
};

export default useUpdateCategory;

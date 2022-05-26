import { gql, useMutation } from "@apollo/client";

export const UPDATE_EMPLOYEE = gql`
  mutation (
    $id: ID!
    $name: String!
    $slug: String!
    $icon: String!
    $photo: Upload!
  ) {
    salaryMutation(
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

const useUpdateSalary = () => {
  const [salaryMutationHandler, { data, loading, error }] = useMutation(UPDATE_EMPLOYEE);
  return {
    salaryMutationHandler,
    data,
    loading,
    error,
  };
};

export default useUpdateSalary;

import { gql, useMutation } from "@apollo/client";

export const UPDATE_EMPLOYEE = gql`
  mutation (
    $id: ID!
    $name: String!
    $slug: String!
    $icon: String!
    $photo: Upload!
  ) {
    employeeMutation(
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

const useUpdateEmployee = () => {
  const [employeeMutationHandler, { data, loading, error }] = useMutation(UPDATE_EMPLOYEE);
  return {
    employeeMutationHandler,
    data,
    loading,
    error,
  };
};

export default useUpdateEmployee;

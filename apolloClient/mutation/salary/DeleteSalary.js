import { gql, useMutation } from "@apollo/client";

export const DELETE_SALARY = gql`
  mutation ($id: ID!) {
    salaryDelete(id: $id) {
      category {
        id
      }
    }
  }
`;

const useDeleteSalary = () => {
  const [employeeDeleteMutation, { data, loading, error, reset }] =
    useMutation(DELETE_SALARY);
  return {
    employeeDeleteMutation,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteSalary;

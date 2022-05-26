import { gql, useMutation } from "@apollo/client";
import { GET_VAT_GST_LIST } from "../../queries/vatGst/vatGstListQuery";

export const DELETE_EMPLOYEE = gql`
  mutation ($id: ID!) {
    employeeDelete(id: $id) {
      category {
        id
      }
    }
  }
`;

const useDeleteEmployee = () => {
  const [employeeDeleteMutation, { data, loading, error, reset }] =
    useMutation(DELETE_CATEGORY);
  return {
    employeeDeleteMutation,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteEmployee;

import { gql, useMutation } from "@apollo/client";

export const DELETE_INCENTIVE = gql`
  mutation ($id: ID!) {
    categoryDelete(id: $id) {
      category {
        id
      }
    }
  }
`;

const useDeleteIncentive = () => {
  const [incentiveDeleteMutation, { data, loading, error, reset }] =
    useMutation(DELETE_INCENTIVE);
  return {
    incentiveDeleteMutation,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteIncentive;

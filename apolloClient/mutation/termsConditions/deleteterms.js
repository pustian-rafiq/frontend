import { gql, useMutation } from "@apollo/client";
import { GET_TERMS } from "../../queries/termsCondition/termscondition";

export const DELETE_TERMS = gql`
  mutation ($id: ID!) {
    deleteTermCondition(id: $id) {
       termCondition{
            id
            description
        }
    }
  }
`;

const useDeleteTerms = () => {
  const [deleteTermCondition, { data, loading, error }] = useMutation(DELETE_TERMS, {
    refetchQueries: [
      GET_TERMS, // DocumentNode object parsed with gql
    ],
  });
  return {
    deleteTermCondition,
    data,
    loading,
    error,
  };
};

export default useDeleteTerms;

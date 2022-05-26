import { gql, useMutation } from "@apollo/client";
import { GET_TERMS } from "../../queries/termsCondition/termscondition";

export const UPDATE_TERMS=gql`
  mutation (
    $description:String
     $id: ID!
  ) {
    termConditionCreateOrUpdate(
      input: { 
          id: $id
          description: $description
      }
    ) 
    {
        termCondition{
            description
            id
        }
    }
  }

`

const useUpdateTerms = () => {
  const [termConditionCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_TERMS,
    {
      refetchQueries: [
        GET_TERMS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
  termConditionCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useUpdateTerms;

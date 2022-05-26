import { gql, useMutation } from "@apollo/client";
import { GET_TERMS } from "../../queries/termsCondition/termscondition";

export const CREATE_TERMS = gql`
  mutation (

    $title: String
    $description:String

  ) {
    termConditionCreateOrUpdate(
      input: {
      
        title: $title
        description: $description
      }
    ) 
    {
        termCondition{
            
            title
            description
        }
    }
  }
`;

const useCreateTerms = () => {
  const [termConditionCreateOrUpdate, { data, loading, error }] = useMutation(
    CREATE_TERMS,
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

export default useCreateTerms;
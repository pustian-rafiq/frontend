import { gql, useMutation } from "@apollo/client";

export const UPDATE_PARENTS = gql`
  mutation (
    $id: ID!
    $fatherName: String!
    $fatherOccupation: String!
    $motherName: String!
    $motherOccupation: String!
  ) {
    updateConsumer(
        consumerData: {
        id: $id
        fatherName: $fatherName
        fatherOccupation:  $fatherOccupation
        motherName:  $motherName
        motherOccupation: $motherOccupation 
      }
    ) {
        consumer {
            phone
            religion
            username
            fatherName
            gender
      }
    }
  }
`;

const useUpdateParents = () => {
    const [parentsMutationHandler, { data, loading, error }] = useMutation(UPDATE_PARENTS);
    return {
      parentsMutationHandler,
        data,
        loading,
        error,
    };
};

export default useUpdateParents;

import { gql, useMutation } from "@apollo/client";

export const UPDATE_PARENTS_INFO = gql`
  mutation (
    $id: ID!
    $fatherName: String
    $motherName: String
    $fatherOccupation: String
    $motherOccupation: String
  ) {
    updateMasterconsumer(
      consumerData: {
        id: $id
        fatherName: $fatherName
        motherName:  $motherName
        fatherOccupation:  $fatherOccupation
        motherOccupation:  $motherOccupation
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

const useUpdateParentsInfo = () => {
    const [parentsInfoMutationHandler, { data, loading, error }] = useMutation(UPDATE_PARENTS_INFO);
    return {
        parentsInfoMutationHandler,
        data,
        loading,
        error,
    };
};

export default useUpdateParentsInfo;

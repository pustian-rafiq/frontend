import { gql, useMutation } from "@apollo/client";

export const UPDATE_EDUCATION = gql`
  mutation (
    $id: ID!
    $primaryNameAndSession: String!
    $highschoolNameAndSession: String!
    $collegeNameAndSession: String!
    $universityNameAndSession: String!
    $phdNameAndSession: String!
    $othersNameAndSession: String!
  ) {
    updateConsumer(
        consumerData: {
        id: $id
        primaryNameAndSession: $primaryNameAndSession
        highschoolNameAndSession:  $highschoolNameAndSession
        collegeNameAndSession:  $collegeNameAndSession
        universityNameAndSession: $universityNameAndSession
        phdNameAndSession:  $phdNameAndSession
        othersNameAndSession:  $othersNameAndSession
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

const useUpdateEducation = () => {
    const [educationMutationHandler, { data, loading, error }] = useMutation(UPDATE_EDUCATION);
    return {
        educationMutationHandler,
        data,
        loading,
        error,
    };
};

export default useUpdateEducation;

import { gql, useMutation } from "@apollo/client";

export const UPDATE_PERSONAL_INFO = gql`
  mutation (
    $id: ID!
    $firstName: String!
    $lastName: String!
  ) {
    updateMasterconsumer(
      consumerData: {
        id: $id
        firstName: $firstName
        lastName:  $lastName
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

const useUpdatePersonalInfo = () => {
    const [personalInfoMutationHandler, { data, loading, error }] = useMutation(UPDATE_PERSONAL_INFO);
    return {
        personalInfoMutationHandler,
        data,
        loading,
        error,
    };
};

export default useUpdatePersonalInfo;

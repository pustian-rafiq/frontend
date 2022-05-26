import { gql, useMutation } from "@apollo/client";

export const UPDATE_ABOUT = gql`
  mutation (
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $bKashAcc: String!
    $dateOfBirth: String!
    $nidNumber: String!
    $religion: String!
    $gender: String!
    $country: ID!
    $callingCode: String!
    $spouseName: String!
  ) {
    updateConsumer(
        consumerData: {
        id: $id
        firstName: $firstName
        lastName:  $lastName
        phone:  $phone
        bKashAcc: $bKashAcc
        dateOfBirth:  $dateOfBirth
        nidNumber: $nidNumber
        religion: $religion
        gender:  $gender
        country: $country
        callingCode: $callingCode
        spouseName: $spouseName
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

const useUpdateAbout = () => {
    const [aboutMutationHandler, { data, loading, error }] = useMutation(UPDATE_ABOUT);
    return {
        aboutMutationHandler,
        data,
        loading,
        error,
    };
};

export default useUpdateAbout;

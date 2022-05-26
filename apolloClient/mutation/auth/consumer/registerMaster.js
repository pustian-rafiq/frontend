 import { gql, useMutation } from "@apollo/client";

const MASTER_CONSUMER_REGISTER = gql`
  mutation masterConsumerRegister(
    $firstName: String!
    $lastName: String!
    $country: ID!
    $phone: String!
    $gender: String!
    $religion: String!
    $referedBy: String!
    $callingCode: String!
    $photo: Upload!
  ) {
    createMasterconsumer(
      consumerData: {
        firstName: $firstName
        lastName: $lastName
        referedBy: $referedBy
        phone: $phone
        photo: $photo
        country: $country
        gender: $gender
        religion: $religion
        callingCode: $callingCode
      }
    ) {
      consumer {
        referedBy
        phone
        religion
        username
        fatherName
        motherName
        gender

      }
    }
  }
`;

const useMasterRegisterMutation = () =>  {
  const [masterRegisterMutationHandler, { loading, error, data }] =
    useMutation(MASTER_CONSUMER_REGISTER);

  return { masterRegisterMutationHandler, loading, error, data };
};

 export default useMasterRegisterMutation;

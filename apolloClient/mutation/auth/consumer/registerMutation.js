import { gql, useMutation } from "@apollo/client";

const CONSUMER_REGISTER = gql`
  mutation consumerRegister(
    $firstName: String!
    $lastName: String!
    $refferedBy: String!
    $photo: Upload!
    $country: ID!
    $mobileNo: String!
    $gender: String!
    $callingCode: String!
  ) {
    createConsumer(
      consumerData: {
        firstName: $firstName
        lastName: $lastName
        referedBy: $refferedBy
        phone: $mobileNo
        photo: $photo
        country: $country
        gender: $gender
        callingCode: $callingCode
      },
      
    ) {
      consumer {
        referedBy
        phone
        religion
        username
        fatherName
        motherName
        gender
        fatherNameChange
        motherNameChange
      }
    }
  }
`;

const useConsumerRegisterMutation = () => {
  const [consumerRegisterMutationHandler, { loading, error, data }] =
    useMutation(CONSUMER_REGISTER);

  return { consumerRegisterMutationHandler, loading, error, data };
};

export default useConsumerRegisterMutation;

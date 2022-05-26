import { gql, useMutation } from "@apollo/client";

const POSTOFIICE_ADD = gql`
  mutation postOfficeAdd(
    $name: String!
    $zipcode: String!
    $policeStationId: ID!
  ) {
    postOfficeCreate(
      input: {
        name: $name
        zipcode: $zipcode
        policeStationId: $policeStationId
      }
    ) {
      postOffice{
      id,
      name
        zipcode
        policeStation{
          name
        }
      
    }
    }
  }
`;

const usePostOfficeMutation = () => {
  const [postOfficeMutationHandler, { loading, error, data }] =
    useMutation(POSTOFIICE_ADD);

  return { postOfficeMutationHandler, loading, error, data };
};

export default usePostOfficeMutation;

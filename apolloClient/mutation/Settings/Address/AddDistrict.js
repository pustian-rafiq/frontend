import { gql, useMutation } from "@apollo/client";

const DISTRICT_ADD = gql`
  mutation districtAdd(
    $name: String!
    $divisionOrStateId: ID!
  ) {
    districtOrCityMutation(
      input: {
        name: $name
        divisionOrStateId: $divisionOrStateId
      }
    ) {
      districtOrCity{
      id,
      name,
      divisionOrState{
      name
      }
    }
    }
  }
`;

const useDistrictMutation = () => {
    const [districtMutationHandler, { loading, error, data }] =
        useMutation(DISTRICT_ADD);

    return { districtMutationHandler, loading, error, data };
};

export default useDistrictMutation;

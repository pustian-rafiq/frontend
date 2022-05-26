import { gql, useMutation } from "@apollo/client";

const POLICE_STATION_ADD = gql`
  mutation policeStationAdd(
    $name: String!
    $districtOrCityId: ID!
  ) {
    policeStationCreate(
      input: {
        name: $name
        districtOrCityId: $districtOrCityId
      }
    ) {
      policeStation{
      id,
      name
      districtOrCity{
          id
          name
      }
    }
    }
  }
`;

const usePoliceStationMutation = () => {
  const [policeStationMutationHandler, { loading, error, data }] =
    useMutation(POLICE_STATION_ADD);

  return { policeStationMutationHandler, loading, error, data };
};

export default usePoliceStationMutation;

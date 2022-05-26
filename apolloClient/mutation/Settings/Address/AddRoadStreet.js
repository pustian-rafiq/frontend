import { gql, useMutation } from "@apollo/client";

const ROAD_STREET_ADD = gql`
  mutation roadStreetAdd(
    $name: String!
    $districtOrCityId: ID!
    $policeStationId: ID!
  ) {
    roadOrStreatNoCreate(
      input: {
        name: $name
        districtOrCityId: $districtOrCityId
        policeStationId: $policeStationId
      }
    ) {
      roadOrStreatNo{
        id,
        name
        policeStation{
          name
        }
      
    }
  }
  }
`;

const useRoadStreetMutation = () => {
    const [roadStreetMutationHandler, { loading, error, data }] =
        useMutation(ROAD_STREET_ADD);

    return { roadStreetMutationHandler, loading, error, data };
};

export default useRoadStreetMutation;

import { gql, useMutation } from "@apollo/client";

const SUB_DISTRICT_ADD = gql`
  mutation subDistrictAdd(
    $name: String!
    $districtOrCityId: ID!
  ) {
    subDistrictCreate(
      input: {
        name: $name
        districtOrCityId: $districtOrCityId
      }
    ) {
      subDistrict{
      id,
      name
      districtOrCity{
          name
        }     
    }
    }
  }
`;

const useSubDistrictMutation = () => {
    const [subDistrictMutationHandler, { loading, error, data }] =
        useMutation(SUB_DISTRICT_ADD);

    return { subDistrictMutationHandler, loading, error, data };
};

export default useSubDistrictMutation;

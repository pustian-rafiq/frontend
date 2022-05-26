import { gql, useMutation } from "@apollo/client";

const ADD_WAREHOUSE = gql`
  mutation addWarehouse(
    $name: String!
    $description: String
    $countryId: ID
    $districtOrCityId: ID
    $divisionOrStateId: ID
    $image: Upload
  ) {
    createWarehouse(
        name: $name
        description: $description
        countryId: $countryId
        districtOrCityId: $districtOrCityId
        divisionOrStateId: $divisionOrStateId
        image: $image
    ) {
      warehouse {
        id 
        name
        country{
           id
           name
        }
        divisionOrState{
           id
           name
        }
        districtOrCity{
            id
            name
      }
    }
    }
  }
`;

const useWarehouseMutation = () => {
  const [warehouseMutationHandler, { loading, error, data }] =
    useMutation(ADD_WAREHOUSE);

  return { warehouseMutationHandler, loading, error, data };
};

export default useWarehouseMutation;

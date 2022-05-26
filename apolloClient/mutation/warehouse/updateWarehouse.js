import { gql, useMutation } from "@apollo/client";
import { GET_WEARHOUSE_LIST } from "../../queries/ConsumerDashboard/wearhouse/WearhouseQuery";

const UPDATE_WAREHOUSE = gql`
  mutation updateWarehouse(
    $id: ID!
    $name: String
    $description: String
    $countryId: ID
    $districtOrCityId: ID
    $divisionOrStateId: ID
    $image: Upload
  ) {
    updateWarehouse(
        id: $id
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
    }
    }
  }
`;

const useWarehouseUpdateMutation = () => {
  const [warehouseUpdateHandler, { loading, error, data }] =
    useMutation(UPDATE_WAREHOUSE);

  return { warehouseUpdateHandler, loading, error, data };
};

export default useWarehouseUpdateMutation;

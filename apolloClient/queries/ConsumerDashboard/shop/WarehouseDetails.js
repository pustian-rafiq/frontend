import { gql, useQuery } from "@apollo/client";

// query
export const GET_WAREHOUSE_DETAILS = gql`
 query($id: ID!){
  warehouse(id:$id){
    id
    name
    description
    image
    country
    {
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
`;

const useWarehouseDetails = (id) => {

  const { loading, error, data } = useQuery(GET_WAREHOUSE_DETAILS, {
    variables: { id: id },
  });

  return {
    loading,
    error,
    data,
  };
};

export default useWarehouseDetails;

import { gql, useQuery } from "@apollo/client";
// query
export const GET_SINGLE_COMMSION = gql`

  query ($id: ID!) {
   termCondition(id:$id){
     id
    description
  }
}
  

`;

const useSingleCommision = (comid) => {
  const { data, loading, error } = useQuery(GET_SINGLE_COMMSION, {
    variables: { id: comid },
  });
 
  return { data, loading, error };
};

export default useSingleCommision;
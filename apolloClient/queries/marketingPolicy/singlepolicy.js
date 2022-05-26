import { gql, useQuery } from "@apollo/client";
// query
export const GET_SINGLE_POLICY= gql`
  query ($id: ID!) {
   marketingPolicy(id:$id){
     id
    description
    title
  }
}
  

`;

const useSinglePolicy = (policyid) => {
  const { data, loading, error } = useQuery(GET_SINGLE_POLICY, {
    variables: { id: policyid },
  });
 


  return { data, loading, error };
};

export default useSinglePolicy;
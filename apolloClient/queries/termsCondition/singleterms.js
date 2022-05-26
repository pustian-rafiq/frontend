import { gql, useQuery } from "@apollo/client";
// query
export const GET_SINGLE_TERMS = gql`
  query ($id: ID!) {
   termCondition(id:$id){
     id
    description
  }
}
  

`;

const useSingleTerms = (termsId) => {
  const { data, loading, error } = useQuery(GET_SINGLE_TERMS, {
    variables: { id: termsId },
  });
 


  return { data, loading, error };
};

export default useSingleTerms;
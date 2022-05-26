import { gql, useMutation } from "@apollo/client";
import { GET_MARKETING_POLICIES } from "../../queries/marketingPolicy/marketing_policys";


export const DELETE_MARKETING =gql`
mutation($id:ID!){
  deleteMarketingPolicy(
    id: $id
  ){
    marketingPolicy{
    id
    description
    title
    }
  }
}

`

const deleteMarketing =()=>{

 const [deleteMarketingPolicy,{data,loading,error}] =useMutation(DELETE_MARKETING,{
    refetchQueries: [
      GET_MARKETING_POLICIES, // DocumentNode object parsed with gql
    ],
  });

  return{
   deleteMarketingPolicy,
    data,
    loading,
    error,
  };

}


export default deleteMarketing ;
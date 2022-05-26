import { gql, useMutation } from "@apollo/client";
import { GET_MARKETING_POLICIES } from "../../queries/marketingPolicy/marketing_policys";

export const CREATE_MARKETING_POLICY =gql`
mutation(
    $title :String
    $description:String
){
  marketingPolicyCreateOrUpdate(
    input:{
  	  title: $title
      description:$description
    }
  ){
    marketingPolicy{
     title
      description
      }
  }
}
`

const useMarketingPolicy = () =>  {
  const [marketingPolicyCreateOrUpdate, { data,loading, error}] =
    useMutation(CREATE_MARKETING_POLICY,
      {
      refetchQueries: [
        GET_MARKETING_POLICIES, // DocumentNode object parsed with gql
      ],
    }
    )

  return { marketingPolicyCreateOrUpdate, 
  data,
  loading,
  error
};
};

 export default useMarketingPolicy;


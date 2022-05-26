import { gql, useMutation } from "@apollo/client";
import { GET_MARKETING_POLICIES } from "../../queries/marketingPolicy/marketing_policys";

export const UPDATE_POLICY = gql`
mutation(
     $id: ID!
     $title :String
     $description:String
){
  marketingPolicyCreateOrUpdate(
    input:{
      id:$id
  	  title: $title
      description:$description
    }
  ){
    marketingPolicy{
      id
      title
      description
      }
  }
}
`;

const updatepolicy = () => {
  const [marketingPolicyCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_POLICY,
    {
      refetchQueries: [
        GET_MARKETING_POLICIES, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    marketingPolicyCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default updatepolicy;
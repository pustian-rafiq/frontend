import { gql, useQuery } from "@apollo/client";

// query
export const GET_RIGHT_REFERENCE_DETAILS = gql`
 query($id: ID!,,$last: Int, $before: String){
  consumer(id: $id){
    username
    callingCode
    phone
    user{
      firstName
      lastName
    }
    	consumerreftree{
      ref1Count
      ref2Count
      rootCount
          ref2(last:$last, before: $before){
            edges{
              node{
                user{
                  firstName
                  lastName
                  username                          
                  consumers{
                    callingCode
                    phone
                    country{name}
                    consumerreftree{
                      id
                      ref1Count
                      ref2Count
                      ref1ForeignCount
                      ref2ForeignCount
                      rootCount
                      referedBy
                      bronch
                      silver
                      gold 
                      platinum  
                      gem 
                      pearl 
                      diamond 
                      ruby  
                      emerald 
                      crown 
                      paradise                                       
                    }
                  }
                }
              }
            }           
            pageInfo{
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
              
            }
          }
             
        }
  }
}
`;

const useRightReference = (id) => {
  const { loading, error, data,fetchMore } = useQuery(GET_RIGHT_REFERENCE_DETAILS, {
    variables: {id: id, before: null, last: 11 },
  });

  // const { data } = await client.query({
  //   query: GET_VAT_GST,
  //   variables: { id: id },
  // });

  return {
    loading,
    error,
    data,
    fetchMore
  };
};

export default useRightReference;

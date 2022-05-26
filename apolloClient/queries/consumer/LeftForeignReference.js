import { gql, useQuery } from "@apollo/client";

// query
export const GET_LEFT_FOREIGN_REFERENCE_DETAILS = gql`
 query($id: ID!,$last: Int, $before: String){
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
          ref1Foreign(last:$last, before: $before){
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

const useLeftForeignReference = (id) => {
  const { loading, error, data,fetchMore } = useQuery(GET_LEFT_FOREIGN_REFERENCE_DETAILS, {
    variables: {id: id, before: null, last: 11 },
  });

  return {
    loading,
    error,
    data,
    fetchMore
  };
};

export default useLeftForeignReference;

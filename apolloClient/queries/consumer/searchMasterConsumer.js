import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_SEARCH_MASTER_CONSUMERS = gql`
  query($search: String!) {
    searchMasterConsumer(search: $search) {
      edges {
        node {
          id
          username
          photo
          phone
          consumerreftree {
            ref1Count
            ref2Count
          }
          user {
            username
            firstName
            lastName
            email
          }
        }
      }
    pageInfo{
      endCursor
      hasNextPage
      startCursor
      hasPreviousPage
        }
    }
  }
`;
//export default GET_CONSUMERS


 const useSearchMasterConsumers = (searchText,token) => {

  //  const { loading, error, data,fetchMore } = useQuery(GET_SEARCH_CONSUMERS,{
  //   variables: { search: searchText },
   
  // });
        const searchData = client.query({ query: GET_SEARCH_MASTER_CONSUMERS, variables: { search: searchText },
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
         } );
        return searchData

};

  export default useSearchMasterConsumers;

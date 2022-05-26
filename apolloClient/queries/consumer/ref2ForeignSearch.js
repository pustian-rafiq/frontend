import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_SEARCH_REF2_FOREIGN_CONSUMERS = gql`
  query($search: String!) {
    searchRef2ForeignConsumers(search: $search) {
        edges{
            node{
                id
                username #CIN

                user{
                firstName
                lastName
                }
        
                rank
                isMaster
                photo
                
                country{
                name
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


const useSearchRef2ForeignConsumers = (searchText,token) => {

    //  const { loading, error, data,fetchMore } = useQuery(GET_SEARCH_CONSUMERS,{
    //   variables: { search: searchText },

    // });
    const searchData = client.query({ query: GET_SEARCH_REF2_FOREIGN_CONSUMERS, variables: { search: searchText }, context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
     });
    return searchData

};

export default useSearchRef2ForeignConsumers;

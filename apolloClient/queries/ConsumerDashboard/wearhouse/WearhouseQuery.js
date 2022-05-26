import { gql } from "@apollo/client";

// query
export const GET_WEARHOUSE_LIST = gql`
 query($last: Int, $before: String){
  me{
    username
    consumers{
      username
      warehouses(last:$last, before: $before){
        edges{
          node{
            name
            description
            image
            id
          }
        }
        pageInfo{
          startCursor
          endCursor
          
        }
          
      }
    }

  }
}
`;




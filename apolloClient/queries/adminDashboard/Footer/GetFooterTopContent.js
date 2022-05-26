import { gql, useQuery } from "@apollo/client";

// query
export const GET_FOOTERTOP_CONTENT = gql`
  query {
    footerTopContents{
        edges{
          node{
            id
            name
            link
            priority
          }
        }
      }
  }
`;
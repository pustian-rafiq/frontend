import { gql, useQuery } from "@apollo/client";

// query
export const GET_SISTER_CONCERN = gql`
  query {
    footerTopSisterConcerns{
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
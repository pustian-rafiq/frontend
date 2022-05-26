import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_MASTER_CONSUMERS = gql`
  query ($last: Int, $before: String) {
    allMasterConsumer(last: $last, before: $before) {
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
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
    }
  }
`;
//export default

// export const GET_MASTER_CONSUMERS = gql`
//   query($cursor: String){
//     allMasterConsumer(last:12,before: $cursor) {
//       edges {
//         node {
//           username
//           photo
//           phone
//           consumerreftree{
//             ref1Count
//             ref2Count
//           }
//           user{
//             username
//             firstName
//             lastName
//             email
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//         startCursor
//         hasPreviousPage
//       }
//     }
//   }
// `;
// //export default

// const useConsumers =   () => {
//   const { loading, error, data, fetchMore } =   useQuery(GET_MASTER_CONSUMERS,{
//     variables: { before: null }
//   });

// //return data
//   return {
//     loading,
//     error,
//     data,
//     fetchMore
//   };
// };

// export default useConsumers;

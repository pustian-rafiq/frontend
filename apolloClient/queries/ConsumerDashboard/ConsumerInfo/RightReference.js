import { gql, useQuery } from "@apollo/client";

// query
export const GET_REF2_CONSUMERS = gql`
  query($last: Int, $before: String) {
   me{
    consumers{
      username      
      consumerreftree{
        ref2(last:$last, before: $before){
          edges
          {
            node{
              id
              username
              callingCode
              phone
              country{
                name
              }
              user{
                firstName
                lastName
              }   
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
}
`;

// const useRef1Consumers = (id) => {
//   const { loading, error, data, fetchMore } = useQuery(GET_REF1_CONSUMERS, {
//     variables: { id: id, before: null, last: 15 },
//   });

//   return {
//     loading,
//     error,
//     data,
//     fetchMore
//   };
// };

// export default useRef1Consumers;

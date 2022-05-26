import { gql, useQuery } from "@apollo/client";

// query
export const GET_CONSUMERS = gql`
  query($last: Int, $before: String) {
    allConsumerNode(last:$last, before: $before) {
      edges {
        node {
          id
          username
          referedBy
          password
          phone
          leftRefer
          rightRefer
          callingCode
          user{
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
//export default GET_CONSUMERS


// const useConsumers = () => {
//   / const { loading, error, data } = useQuery(GET_CONSUMERS);
//  // const data = client.query({ query: GET_CONSUMERS });
//   // data.then((res) => {
//   //   console.log(res)
//   //   return  res ;
//   // }).catch((err) => {
//   //   console.log(err)
//   // })

// return data
//   // return {
//   //   loading,
//   //   hasError,
//   //   data,
//   // };
// };

// export default useConsumers;

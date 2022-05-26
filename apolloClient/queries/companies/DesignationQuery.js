import { gql } from "@apollo/client";

// query
export const GET_DESIGNATIONS = gql`
  query{
  designations(first:100){
    edges{
      node{
        id
        name
        slug 
        icon
      }
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

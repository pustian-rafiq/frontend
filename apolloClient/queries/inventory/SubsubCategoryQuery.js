import { gql } from "@apollo/client";

// query
export const GET_SUB_SUBCATEGORIES = gql`
  query {
  subSubCategories{
    edges{
      node{
        id
        name
        image
        icon
        subCategory{
            
          id
          name
        }
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

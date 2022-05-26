import { gql, useQuery } from "@apollo/client";

// query
export const GET_SUB_CATEGORY = gql`
 query($id: ID!){
  subCategory(id: $id ){
        id
        name
        image
        slug
        category{
          id
          name
        }
      }
    }
`;

const useEditSubCategory = (id) => {
  const { loading, error, data } = useQuery(GET_SUB_CATEGORY, {
    variables: { id: id },
  });

  // const { data } = await client.query({
  //   query: GET_VAT_GST,
  //   variables: { id: id },
  // });

  return {
    loading,
    error,
    data,
  };
};

export default useEditSubCategory;

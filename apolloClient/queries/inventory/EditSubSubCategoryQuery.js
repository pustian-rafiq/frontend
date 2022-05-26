import { gql, useQuery } from "@apollo/client";

// query
export const GET_SUB_SUBCATEGORY = gql`
 query($id: ID!){
  subSubCategory(id: $id ){
        id
        name
        slug
        image
        subCategory{
          id
          name
      }

      }
    }
`;

const useEditSubSubCategory = (id) => {
  const { loading, error, data } = useQuery(GET_SUB_SUBCATEGORY, {
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

export default useEditSubSubCategory;

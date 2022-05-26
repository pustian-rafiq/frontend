import { gql, useQuery } from "@apollo/client";

// query
export const GET_CATEGORY = gql`
 query($id: ID!){
  category(id: $id ){
        id
        name
        slug
        image
        icon
      }
    }
`;

const useEditCategory = (id) => {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
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

export default useEditCategory;

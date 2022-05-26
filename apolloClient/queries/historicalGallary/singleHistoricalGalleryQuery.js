import { gql, useQuery } from "@apollo/client";
// query
export const GET_SINGLE_GAllERY = gql`
  query ($id: ID!) {
    historicalSlider(id: $id) {
      id
      title
      description
      image
      country {
        name
      }
      isActive
      isNegative
      isArchived
    }
  }
`;

const useSingleGallary = (galaryid) => {
  const { data, loading, error } = useQuery(GET_SINGLE_GAllERY, {
    variables: { id: galaryid },
  });

  return { data, loading, error };
};

export default useSingleGallary;

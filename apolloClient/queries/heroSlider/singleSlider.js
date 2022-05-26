import { gql, useQuery } from "@apollo/client";
// query
export const GET_SLIDER = gql`
  query ($id: ID!) {
    slider(id: $id) {
      id
      title
      isActive
      image
      product {
        id
        name
      }
    }
  }
`;

const useSingleSlider = (sliderId) => {
  const { data, loading, error } = useQuery(GET_SLIDER, {
    variables: { id: sliderId },
  });

  return { data, loading, error };
};

export default useSingleSlider;

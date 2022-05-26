import { gql, useMutation } from "@apollo/client";
import { GET_SLIDERS } from "../../queries/heroSlider/heroSlider";

export const DELETE_SLIDER = gql`
  mutation ($id: ID!) {
    deleteSlider(id: $id) {
      slider {
        id
        title
      }
    }
  }
`;

const useDeleteSlider = () => {
  const [deleteSlider, { data, loading, error }] = useMutation(DELETE_SLIDER, {
    refetchQueries: [
      GET_SLIDERS, // DocumentNode object parsed with gql
    ],
  });
  return {
    deleteSlider,
    data,
    loading,
    error,
  };
};

export default useDeleteSlider;

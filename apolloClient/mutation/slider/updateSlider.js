import { gql, useMutation } from "@apollo/client";
import { GET_SLIDERS } from "../../queries/heroSlider/heroSlider";

export const UPDATE_SLIDER = gql`
  mutation (
    $id: ID!
    $productId: ID!
    $isActive: Boolean!
    $title: String!
    $image: Upload
  ) {
    sliderCreateOrUpdate(
      input: {
        id: $id
        productId: $productId
        isActive: $isActive
        title: $title
        image: $image
      }
    ) {
      slider {
        id
        product {
          id
          name
        }
        title
        isActive
      }
    }
  }
`;

const useUpdateSlider = () => {
  const [sliderCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_SLIDER,
    {
      refetchQueries: [
        GET_SLIDERS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    sliderCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useUpdateSlider;

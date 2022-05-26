import { gql, useMutation } from "@apollo/client";
import { GET_SLIDERS } from "../../queries/heroSlider/heroSlider";

export const CREATE_SLIDER = gql`
  mutation (
    $productId: ID!
    $isActive: Boolean
    $title: String!
    $image: Upload!
  ) {
    sliderCreateOrUpdate(
      input: {
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

const useCreateSlider = () => {
  const [sliderCreateOrUpdate, { data, loading, error }] = useMutation(
    CREATE_SLIDER,
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

export default useCreateSlider;

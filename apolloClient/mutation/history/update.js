import { gql, useMutation } from "@apollo/client";
import { GET_GALLARY } from "../../queries/historicalGallary/historicalGalleryQuery";

export const UPDATE_GALLARY = gql`
  mutation (
    $id: ID!
    $isActive: Boolean!
    $title: String!
    $image: Upload

  ) {
    historicalSliderCreateOrUpdate(
      input: {
        id: $id
        isActive: $isActive
        title: $title
        image: $image
      }
    ) {
      historicalSlider {
        id
        title
        isActive
      }
    }
  }
`;

const useUpdateGallary = () => {
  const [historicalSliderCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_GALLARY,
    {
      refetchQueries: [
        GET_GALLARY, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    historicalSliderCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useUpdateGallary;

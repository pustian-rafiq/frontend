import { gql, useMutation } from "@apollo/client";
import { GET_GALLARY } from "../../queries/historicalGallary/historicalGalleryQuery";

export const CREATE_GALARY = gql`
  mutation (
    $isActive: Boolean
    $title: String!
    $image: Upload!
    $youtubeLink:String
    $description:String
    $countryId:ID

  ) {
    historicalSliderCreateOrUpdate(
      input: {

        isActive: $isActive
        title: $title
        image: $image
        youtubeLink:$youtubeLink
        description:$description
        countryId:$countryId
      }
    ) {
    historicalSlider{
    id
    title
  }
    }
  }
`;

const useCreategallary = () => {
  const [historicalSliderCreateOrUpdate, { data, loading, error }] = useMutation(
    CREATE_GALARY,
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

export default useCreategallary;
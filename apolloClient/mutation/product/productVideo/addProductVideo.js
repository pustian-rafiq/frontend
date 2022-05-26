import { gql, useMutation } from "@apollo/client";

export const ADD_PRODUCT_VIDEO = gql`
  mutation (
    $title: String
    $description: String
    $tags: String
    $categoryId: Int
    $madeForKids: Boolean
    $videoFile: Upload
    $thumbnail: Upload
    $productId: ID
  ) {
    uploadVideo(
      input: {
        title: $title
        description: $description
        tags: $tags
        categoryId: $categoryId
        madeForKids: $madeForKids
        videoFile: $videoFile
        thumbnail: $thumbnail
        productId: $productId
      }
    ) {
      ytVideo {
        id
        title
        description
        categoryId
      }
    }
  }
`;
const useAddProductVideo = () => {
  const [uploadVideo, { data, loading, error }] = useMutation(
    ADD_PRODUCT_VIDEO
    // {
    //   refetchQueries: [
    //     GET_PRODUCT_UNITS, // DocumentNode object parsed with gql
    //   ],
    // }
  );
  return {
    uploadVideo,
    data,
    loading,
    error,
  };
};

export default useAddProductVideo;

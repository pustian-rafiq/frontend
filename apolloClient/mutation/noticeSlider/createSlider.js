import { gql, useMutation } from "@apollo/client";
import { GET_SLIDER_NOTICE } from "../../queries/sliderNotice/sliderNotice";

export const CREATE_SLIDER_NOTICE = gql`
  mutation (
    $id: ID
    $isActive: Boolean
    $title: String
    $link: String
  ) {
    sliderNotificationCreateOrUpdate(
      input: {
        id:$id
        isActive: $isActive
        title: $title
        link: $link
      }
    ) 
    {
        sliderNotification{
            id
            isActive
            link
            createdBy{
                username
            }
            createdAt
            title
        }
    }
  }
`;

const useCreateSliderNotice = () => {
  const [sliderNotificationCreateOrUpdate, { data, loading, error }] = useMutation(
    CREATE_SLIDER_NOTICE,
    {
      refetchQueries: [
        GET_SLIDER_NOTICE, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    sliderNotificationCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useCreateSliderNotice;

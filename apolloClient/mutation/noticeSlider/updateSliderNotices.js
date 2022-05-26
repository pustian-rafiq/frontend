import { gql, useMutation } from "@apollo/client";
import { GET_SLIDER_NOTICE } from "../../queries/sliderNotice/sliderNotice";


export const UPDATE_SLIDER_NOTICES = gql`
mutation(
    $id: ID!
    $isActive: Boolean
    $title: String
    $link: String
){
  sliderNotificationCreateOrUpdate(
    input:{
      id:$id
      isActive:$isActive
  	  title: $title
      link:$link
    }
  ){
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

const updateSliderNotice = () => {
  const [sliderNotificationCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_SLIDER_NOTICES,
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

export default updateSliderNotice;
import { gql, useMutation } from "@apollo/client";
import { GET_SLIDER_NOTICE } from "../../queries/sliderNotice/sliderNotice";

export const DELETE_SLIDER_NOTICE = gql`
  mutation ($id: ID!) {
    sliderNotificationDelete(id: $id) {
      sliderNotification {
        id
        title
      }
    }
  }

  
`;

const useDeleteSliderNotice = () => {
  const [deleteSliderNotice, { data, loading, error }] = useMutation(DELETE_SLIDER_NOTICE, {
    refetchQueries: [
      GET_SLIDER_NOTICE, // DocumentNode object parsed with gql
    ],
  });
  return {
    deleteSliderNotice,
    data,
    loading,
    error,
  };
};

export default useDeleteSliderNotice;
import { gql, useQuery } from "@apollo/client";
// query
export const GET_SLIDER_NOTICE = gql`
  query ($id: ID!) {
    sliderNotification(id: $id) {
      id
      title
      isActive
      link
    }
  }
`;

const useSingleSliderNotice = (noticeId) => {

  const { data, loading, error } = useQuery(GET_SLIDER_NOTICE, {
    variables: { id: noticeId },
  });
   
  return { data, loading, error };
};

export default useSingleSliderNotice;

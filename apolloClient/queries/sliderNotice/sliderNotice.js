import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

export const GET_SLIDER_NOTICE=gql`
query($first: Int){
  sliderNotifications(first:$first){
    edges{
      node{         
        id
        title
        isActive
        link
      }
    }
  }
}
`
const useSliderNotice = async () => {
  const data = client.query({ query: GET_SLIDER_NOTICE });
  return data;
};

export default useSliderNotice;
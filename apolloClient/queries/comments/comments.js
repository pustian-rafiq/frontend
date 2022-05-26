import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_COMMENTS = gql`
 query($last:Int){
  siteComments(last:$last){
    edges{
      node{         
        id
        name
        image
        designation
        comment
        isActive
        isArchived
        isNegative
      }
    }
  }
}
`;

const useComments = async (last) => {
  const data = client.query({ query: GET_COMMENTS,variables:{
  last:last
  } });
  return data;
};

export default useComments;

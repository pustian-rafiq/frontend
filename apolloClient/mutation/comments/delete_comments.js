import { gql, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "../../queries/comments/comments";


export const DELETE_COMMENTS = gql`
  mutation ($id: ID!) {
    deleteSiteComment(id: $id) {
      siteComment {
        id
      }
    }
  }
`;


const useDeleteComment = () => {
  const [deleteSiteComment, { data, loading, error, reset }] = useMutation(
     DELETE_COMMENTS,
    { refetchQueries: [GET_COMMENTS] }
  );
  return {
    deleteSiteComment,
    data,
    loading,
    error,
    reset,
  };
};

export default useDeleteComment;
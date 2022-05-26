import { gql, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "../../queries/comments/comments";

export const UPDATE_COMMENT = gql`
  mutation ($id: ID!, $isActive: Boolean!) {
    siteCommentCreateOrUpdate(input: { id: $id, isActive: $isActive }) {
      siteComment {
        id
        isActive
      }
    }
  }
`;

const useUpdateComment = () => {
  const [siteCommentCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_COMMENT,
    {
      refetchQueries: [
        GET_COMMENTS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    siteCommentCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useUpdateComment;

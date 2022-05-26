import { gql, useMutation } from "@apollo/client";

const CREATE_COMMENTS = gql`
  mutation ($name: String!, $comment: String!, $image: Upload!,$designation:String!) {
    siteCommentCreateOrUpdate(
      input: { name: $name, comment: $comment, image: $image,designation:$designation }
    ) {
      siteComment {
        id
        name
        comment
        image,
        designation
      }
    }
  }
`;

const useCommentsMutation = () => {
  const [siteCommentCreateOrUpdate, { loading, error, data }] =
    useMutation(CREATE_COMMENTS);

  return { siteCommentCreateOrUpdate, loading, error, data };
};

export default useCommentsMutation;

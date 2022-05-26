import { gql, useMutation } from "@apollo/client";

const SISTER_CONCERN_ADD = gql`
  mutation sisterConcernAdd(
    $name: String!
    $link: String!
  ) {
    footerTopSisterConcernMutation(
        name: $name
        link: $link
    ) {
        footerTopSisterConcern{
            id
            name
            link
            priority
          }
    }
  }
`;

const useSisterConcernMutation = () =>  {
  const [sisterConcernMutationHandler, { loading, error, data }] =
    useMutation(SISTER_CONCERN_ADD);
  return { sisterConcernMutationHandler, loading, error, data };
};

 export default useSisterConcernMutation;

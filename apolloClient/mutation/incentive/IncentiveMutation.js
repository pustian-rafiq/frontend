import { gql, useMutation } from "@apollo/client";

const INCENTIVE_ADD = gql`
  mutation categoryAdd(
    $name: String!
    $slug: String!
    $icon: String!
    $photo: Upload!
  ) {
    categoryMutation(
      input: {
        name: $name
        slug: $slug
        icon: $icon
        image: $photo
      }
    ) {
      category {
        id
        name
        slug 
        icon
      }
    }
  }
`;

const useIncentiveMutation = () =>  {
  const [incentiveMutationHandler, { loading, error, data }] =
    useMutation(INCENTIVE_ADD);

  return { incentiveMutationHandler, loading, error, data };
};

 export default useIncentiveMutation;

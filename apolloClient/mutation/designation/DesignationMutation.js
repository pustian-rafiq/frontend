import { gql, useMutation } from "@apollo/client";

const DESIGNATION_ADD = gql`
  mutation designationAdd(
    $name: String!
    $websiteLink: String!
    $code: String!
    $email: String!
    $phone: Upload!
    $logo: Upload!
    $ceoSign: Upload!
  ) {
    designationMutation(
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

const useDesignationMutation = () =>  {
  const [designationMutationHandler, { loading, error, data }] =
    useMutation(DESIGNATION_ADD);

  return { designationMutationHandler, loading, error, data };
};

 export default useDesignationMutation;

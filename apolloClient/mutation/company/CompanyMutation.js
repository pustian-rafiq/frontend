import { gql, useMutation } from "@apollo/client";

const COMPANY_ADD = gql`
  mutation categoryAdd(
    $name: String!
    $websiteLink: String!
    $code: String!
    $email: String!
    $phone: Upload!
    $logo: Upload!
    $ceoSign: Upload!
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

const useCompanyMutation = () =>  {
  const [companyMutationHandler, { loading, error, data }] =
    useMutation(COMPANY_ADD);

  return { companyMutationHandler, loading, error, data };
};

 export default useCompanyMutation;

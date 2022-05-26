import { gql, useMutation } from "@apollo/client";

const SALARY_ADD = gql`
  mutation salaryAdd(
    $name: String!
    $websiteLink: String!
    $code: String!
    $email: String!
    $phone: Upload!
    $logo: Upload!
    $ceoSign: Upload!
  ) {
    salaryMutation(
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

const useSalaryMutation = () =>  {
  const [salaryMutationHandler, { loading, error, data }] =
    useMutation(SALARY_ADD);

  return { salaryMutationHandler, loading, error, data };
};
 export default useSalaryMutation;

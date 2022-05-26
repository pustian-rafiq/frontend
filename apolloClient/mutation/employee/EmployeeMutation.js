import { gql, useMutation } from "@apollo/client";

const EMPLOYEE_ADD = gql`
  mutation employeeAdd(
    $name: String!
    $websiteLink: String!
    $code: String!
    $email: String!
    $phone: Upload!
    $logo: Upload!
    $ceoSign: Upload!
  ) {
    employeeMutation(
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

const useEmployeeMutation = () =>  {
  const [employeeMutationHandler, { loading, error, data }] =
    useMutation(EMPLOYEE_ADD);

  return { employeeMutationHandler, loading, error, data };
};

 export default useEmployeeMutation;

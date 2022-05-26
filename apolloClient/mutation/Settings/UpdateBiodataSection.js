import { gql, useMutation } from "@apollo/client";

export const UPDATE_BIODATA = gql`
  mutation (
    $id: ID!
    $bio: String!
    $bloodGroup: String!
    $height: String!
    $weight: String!
    $hobby: String!
    $languages: String!
    $maritalStatus: String!
    $aboutFamilyMembers: String!
    $aboutTour: String!
    $designationAndServiceOrganization: String!
  ) {
    updateConsumer(
        consumerData: {
        id: $id
        bio: $bio
        bloodGroup:  $bloodGroup
        height:  $height
        weight: $weight
        hobby:  $hobby
        languages:  $languages
        maritalStatus: $maritalStatus
        aboutFamilyMembers: $aboutFamilyMembers
        aboutTour:  $aboutTour
        designationAndServiceOrganization: $designationAndServiceOrganization
      }
    ) {
        consumer {
            phone
            religion
            username
            fatherName
            gender
      }
    }
  }
`;

const useUpdateBiodata = () => {
    const [biodataMutationHandler, { data, loading, error }] = useMutation(UPDATE_BIODATA);
    return {
        biodataMutationHandler,
        data,
        loading,
        error,
    };
};

export default useUpdateBiodata;

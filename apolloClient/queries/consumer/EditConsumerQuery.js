import { gql, useQuery } from "@apollo/client";

// query
export const GET_CONSUMER_DETAILS = gql`
 query($id: ID!){
  consumer(id: $id){
        id,
        isMaster
        username,
        referedBy,
        fatherName,
        motherName,
        rank,
        password
        callingCode
        phone
        occupation
        dateOfBirth
        nidNumber
        gender
        religion
        spouseName
        photo
        fatherName
        designationAndServiceOrganization
        fatherOccupation
        motherName
        motherOccupation
        bio
        bloodGroup
        height
        weight
        hobby
        maritalStatus
        aboutTour
        aboutFamilyMembers
        languages
        primaryNameAndSession
        highschoolNameAndSession
        collegeNameAndSession
        universityNameAndSession
        phdNameAndSession
        othersNameAndSession
        consumerreftree{
          id
          ref1Count
          ref2Count
          ref1ForeignCount
          ref2ForeignCount
          rootCount
          bronch
          silver
          gold 
          platinum  
          gem 
          pearl 
          diamond 
          ruby  
          emerald 
          crown 
          paradise  
        }
        country{
          id
          name
        }
        consumeraddresses{
            continent{
              id
              name

            }
            country{
              id
              name
              currenciesSymbol
          localOneCurrencyToUsd 
          usd1ToLocalCurrency
            }
            divisionOrState{
              id
              name
            }
            districtOrCity{
              id
              name
            }
       }
        user{
          firstName
          lastName
          email
        }
  }
    }
`;

const useDetailsConsumer = (id) => {

  const { loading, error, data } = useQuery(GET_CONSUMER_DETAILS, {
    variables: { id: id },
  });

  return {
    loading,
    error,
    data,
  };
};

export default useDetailsConsumer;

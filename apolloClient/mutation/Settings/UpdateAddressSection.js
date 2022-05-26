import { gql, useMutation } from "@apollo/client";

export const UPDATE_ADDRESS = gql`
  mutation (
      $id: ID!
      $latitude: Float
      $longitude: Float
      $currentLatitude: Float
      $currentLongitude: Float
      $continentId: ID
      $countryId: ID
      $divisionOrStateId: ID
      $districtOrCityId: ID
      $policeStationId: ID
      $subDistrictId: ID
      $roadOrStreetNoId: ID
      $postofficeId: ID
      $municipalityId: ID
      $unionId: ID
      $wordNoId: ID
      $villageId: ID
      $mahalla: String
      $block: String
      $holdingNo: String
      $house: String
  ) {
    consumerAddressCreateOrUpdate(
      input: {
          id: $id
          latitude: $latitude
          longitude: $longitude
          currentLatitude:$currentLatitude
          currentLongitude: $currentLongitude
          continentId: $continentId
          countryId: $countryId
          divisionOrStateId:$divisionOrStateId
          districtOrCityId:$districtOrCityId
          policeStationId: $policeStationId
          subDistrictId: $subDistrictId
          roadOrStreetNoId: $roadOrStreetNoId
          postofficeId: $postofficeId
          municipalityId: $municipalityId
          unionId: $unionId
          wordNoId: $wordNoId
          villageId: $villageId
          mahalla: $mahalla
          block: $block
          holdingNo: $holdingNo
          house: $house
      }
    ) {
      consumerAddress{
      consumer{
        username
        id
      }
     
      country{
        id
        name
      } 
			
      divisionOrState{
        id,
        name
      }
      
      districtOrCity{
        id 
        name
      }

 			policeStation{
        id
        name
      }
      
      
      
      subDistrict{
        id
        name
      }
      
      roadOrStreetNo{
        id
        name
      }
  
      
			postoffice{
        id
        zipcode
        name
        
      }
			
      municipality{
        id 
        name
      }
     
      union{
        id
        name
      }
      
     wordNo{
      id
      number
    }
      
      
      village{
        id
        name
      }

      mahalla
      block 
      holdingNo
      house
    }
    }
  }
`;

const useUpdateAddress = () => {
  const [addressMutationHandler, { data, loading, error }] = useMutation(UPDATE_ADDRESS);
  return {
    addressMutationHandler,
    data,
    loading,
    error,
  };
};

export default useUpdateAddress;

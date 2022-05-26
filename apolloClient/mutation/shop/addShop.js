import { gql, useMutation } from "@apollo/client";

const ADD_SHOP = gql`
    mutation addShop(
      $name: String!
      $slug: String
      $email: String
      $phone: String
      $latitude: Float
      $longitude: Float
      $currentLatitude: Float
      $currentLongitude: Float
      $warehouseId: ID
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
      $shopImage: Upload
      $logo: Upload
      $sliderImage1: Upload
      $sliderImage2: Upload
      $sliderImage3: Upload
      $sliderImage4: Upload
      
    ){
      shopCreateOrUpdate(
        input:{
          name: $name
          slug: $slug
          email:  $email
          phone: $phone
          latitude: $latitude
          longitude: $longitude
          currentLatitude:$currentLatitude
          currentLongitude: $currentLongitude
          warehouseId: $warehouseId
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
          shopImage: $shopImage
          logo: $logo
          sliderImage1: $sliderImage1
          sliderImage2: $sliderImage2
          sliderImage3: $sliderImage3
          sliderImage4: $sliderImage4
        }) 
        {
        shop{
            name
            id
            email
            phone

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

const useShopMutation = () => {
  const [shopMutationHandler, { loading, error, data }] =
    useMutation(ADD_SHOP);

  return { shopMutationHandler, loading, error, data };
};

export default useShopMutation;

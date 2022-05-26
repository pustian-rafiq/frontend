import { gql, useMutation } from "@apollo/client";

const UPDATE_SHOP = gql`
    mutation updateShop(
      $id: ID!
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
      $roadOrStreetNoId: ID
      $postofficeId: ID
      $municipalityId: ID
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
          id: $id
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
          roadOrStreetNoId: $roadOrStreetNoId
          postofficeId: $postofficeId
          municipalityId: $municipalityId
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

const useUpdateShopMutation = () => {
  const [shopUpdateMutationHandler, { loading, error, data }] =
    useMutation(UPDATE_SHOP);

  return { shopUpdateMutationHandler, loading, error, data };
};

export default useUpdateShopMutation;

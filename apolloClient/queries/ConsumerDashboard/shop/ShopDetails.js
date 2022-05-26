import { gql, useQuery } from "@apollo/client";

// query
export const GET_SHOP_DETAILS = gql`
 query($id: ID!){
  shop(id: $id){   
    # shop info
    id
    name
    slug
    phone
    email
    warehouse{
      id
      name
    }
    shopImage
    sliderImage1
    sliderImage2
    sliderImage3
    sliderImage4
    logo
    
    avarageRating
    oneStar
    twoStar
    fourStar
    fiveStar 
    # owner info
    consumer{
      id 
      username
      callingCode
      phone
      user{
        firstName
        lastName
      }
    }

    # location
     continent{
         id
         name
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
`;

const useShopDetails = (id,token) => {
  const { loading, error, data } = useQuery(GET_SHOP_DETAILS, {
    variables: { id: id },
    context: {
      headers: {
          Authorization: `JWT ${token}`,
      },
  },
  });

  // const { data } = await client.query({
  //   query: GET_VAT_GST,
  //   variables: { id: id },
  // });

  return {
    loading,
    error,
    data,
  };
};

export default useShopDetails;

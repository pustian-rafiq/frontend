import { gql } from "@apollo/client";

export const GET_CONSUMER_DETAILS = gql`
query{
  me{
    consumers{
      bKashAcc
         id,
         rightRefer
         leftRefer
        isMaster
        username,
        referedBy,
        fatherName,
        motherName,
        rank,
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
        country{
        name
      }
      #consumer reference tree
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
      user{
        firstName
        lastName
        email
      }  
        
    	#All ingo consumer   
      consumeraddresses{
        continent{
          id
          name
        }
        country{
          id
          name
        }
        divisionOrState{
          id
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
}
`
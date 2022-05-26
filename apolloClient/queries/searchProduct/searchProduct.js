import { gql, useQuery } from "@apollo/client";

// query
export const GET_All_SEARCH_PRODUCT = gql`
  query (
    $originCountry_Continent_Name_Icontains: String
    $originCountry_Name_Icontains: String
    $shop_DistrictOrCity_Name_Icontains: String
    $shop_DivisionOrState_Name_Icontains: String
    $name_Icontains: String
    $category_Name_Icontains: String
    $subcategory_Name_Icontains: String
    $subsubcategory_Name_Icontains: String
    $consumer_User_FirstName_Icontains: String
    $consumer_User_LastName_Icontains: String
    $shop_Name_Icontains: String
    $shop_Municipality_Name_Icontains: String
  ) {
    products(
      originCountry_Continent_Name_Icontains: $originCountry_Continent_Name_Icontains
      originCountry_Name_Icontains: $originCountry_Name_Icontains
      shop_DistrictOrCity_Name_Icontains: $shop_DistrictOrCity_Name_Icontains
      shop_DivisionOrState_Name_Icontains: $shop_DivisionOrState_Name_Icontains
      shop_Municipality_Name_Icontains: $shop_Municipality_Name_Icontains
      name_Icontains: $name_Icontains
      category_Name_Icontains: $category_Name_Icontains
      subcategory_Name_Icontains: $subcategory_Name_Icontains
      subsubcategory_Name_Icontains: $subsubcategory_Name_Icontains
      consumer_User_FirstName_Icontains: $consumer_User_FirstName_Icontains
      consumer_User_LastName_Icontains: $consumer_User_LastName_Icontains
      shop_Name_Icontains: $shop_Name_Icontains
    ) {
      edges {
        node {
          id
          name
          code
          slug
          tags
          description
          productUsedStatus
          productImage
          productSlider1
          productSlider2
          productSlider3
          productSlider4
          quantity
          buyPrice
          sellPrice
          comparePrice
          commission
          buyPriceDolar
          sellPriceDolar
          comparePriceDolar
          commissionDolar
          brandName
          forGender
          ageRange
          newFeature
          material
          boxSize
          packageSize
          warranty
          # warrantyType
          weight
          weightUnit
          size
          sizeUnit
          length
          lengthUnit
          productUnitValue
          avarageRating

          discount
          discountDolar

          productUnit {
            id
            unitName
          }
          originCountry {
            name
          }

          extraFeature
          extraWarrenty

          isAnalog
          isPublished
          publishedDate
          variantOf {
            id
            name
          }

          color {
            id
            name
          }

          company {
            id
            name
          }

          vat {
            id
            sector
            amtValue
            percentageAmt
          }

          category {
            id
            name
          }

          subcategory {
            id
            name
          }

          subsubcategory {
            id
            name
          }

          shop {
            id
            name
          }
          productoffer {
            id
            amount
            amountUsd
            conditionAmount
          }

          consumer {
            username
            isMaster
            country {
              name
              localOneCurrencyToUsd
              usd1ToLocalCurrency
              currenciesSymbol
            }

            user {
              firstName
              lastName
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const useSearchProduct = (
  // originCountry_Continent_Name_Icontains,
  // originCountry_Name_Icontains,
  // shop_DistrictOrCity_Name_Icontains,
  // name_Icontains,
  // category_Name_Icontains,
  // subcategory_Name_Icontains,
  // subsubcategory_Name_Icontains,
  // consumer_User_FirstName_Icontains,
  // consumer_User_LastName_Icontains,
  // shop_Name_Icontains
  productdata
) => {
  const { loading, error, data, fetchMore } = useQuery(GET_All_SEARCH_PRODUCT, {
    variables: {
      // originCountry_Continent_Name_Icontains,
      // originCountry_Name_Icontains,
      // shop_DistrictOrCity_Name_Icontains,
      // name_Icontains,
      // category_Name_Icontains,
      // subcategory_Name_Icontains,
      // subsubcategory_Name_Icontains,
      // consumer_User_FirstName_Icontains,
      // consumer_User_LastName_Icontains,
      // shop_Name_Icontains,
      ...productdata,
    },
  });

  return {
    loading,
    error,
    data,
    fetchMore,
  };
};

export default useSearchProduct;

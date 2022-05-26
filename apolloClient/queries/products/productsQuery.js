import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_PRODUCTS = gql`
  query ProductQuery($after: String, $first: Int!) {
    products(after: $after, first: $first) {
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

const useProducts = async (start, item) => {
  const data = await client.query({
    query: GET_PRODUCTS,
    variables: {
      after: start,
      first: item,
    },
    // fetchPolicy: "cache-and-network",
  });

  return data;
};

export default useProducts;

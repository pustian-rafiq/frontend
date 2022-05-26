import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_PRODUCTS = gql`
  query SingleProduct($productId: ID!) {
    product(id: $productId) {
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
      publishedDate
      quantity
      buyPrice
      sellPrice
      comparePrice
      oneStar
      twoStar
      threeStar
      fourStar
      fiveStar

      commission
      avarageRating
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
      warrantyType
      weight
      weightUnit
      size
      sizeUnit
      length
      lengthUnit
      productUnitValue

      discount
      discountDolar

      productUnit {
        id
        unitName
      }

      extraFeature
      extraWarrenty

      isAnalog
      isPublished

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

      originCountry {
        name
        id
      }

      products(first: 3) {
        edges {
          node {
            name
            id
            productImage
            sellPrice
            quantity
            shop {
              name
              id
            }
            comparePrice
            sellPriceDolar
            productUsedStatus
            productoffer {
              amount
              id
            }
            avarageRating
            originCountry {
              name
              id
            }
          }
        }
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

      shop {
        id
        name
        slug
        shopImage
      }

      productoffer {
        id
        amount
        amountUsd
        conditionAmount
      }

      ratingCount
      totalRating
      avarageRating
    }
  }
`;

const useSingleProduct = async (productId) => {
  const data = await client.query({
    query: GET_PRODUCTS,
    variables: {
      productId: productId,
    },
  });

  return data;
};

export default useSingleProduct;

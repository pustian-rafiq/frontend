import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_PRODUCT = gql`
  query ($id: ID!) {
    product(id: $id) {
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
      commission
      discount
      discountDolar
      buyPriceDolar
      sellPriceDolar
      comparePriceDolar
      commissionDolar
      brandName
      forGender
      releaseDate
      originCountry {
        name
        id
      }
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

      productUnit {
        id
        unitName
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
        name
        amount
        conditionAmount
      }
    }
  }
`;

const useProduct = (productId) => {
  //   const product = await client.query({
  //     query: GET_PRODUCT,
  //     variables: { id: productId },
  //   });

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId,
    },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error };
};

export default useProduct;

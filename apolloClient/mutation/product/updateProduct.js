import { gql, useMutation } from "@apollo/client";
import { GET_CURRENT_USER_PRODUCTS } from "../../queries/products/currentUserProducts";

export const UPDATE_PRODUCT = gql`
  mutation ProductCreateOrUpdate(
    $id: ID!
    $code: String!
    $name: String!
    $slug: String!
    $tags: String
    $description: String
    $productUsedStatus: String
    $originCountryId: ID
    $productImage: Upload
    $productSlider1: Upload
    $productSlider2: Upload
    $productSlider3: Upload
    $productSlider4: Upload
    $quantity: Int
    $buyPrice: Float
    $sellPrice: Float
    $comparePrice: Float
    $commission: Float
    $discount: Float
    $brandName: String
    $forGender: String
    $releaseDate: Date
    $ageRange: String
    $newFeature: String
    $material: String
    $boxSize: String
    $packageSize: String
    $warranty: Int
    $warrantyType: String
    $weight: Float
    $weightUnit: String
    $size: Float
    $sizeUnit: String
    $length: Float
    $lengthUnit: String
    $productUnitValue: Float
    $productUnitId: ID
    $isAnalog: Boolean
    $isPublished: Boolean
    $colorId: ID
    $companyId: ID
    $vatId: ID
    $categoryId: ID
    $subcategoryId: ID
    $subsubcategoryId: ID
    $shopId: ID!
    $productofferId: ID
    $variantOfId: ID
    $publishedDate: Date
    $extraFeature: GenericScalar
    $extraWarrenty: GenericScalar
  ) {
    productCreateOrUpdate(
      input: {
        id: $id
        code: $code
        name: $name
        slug: $slug
        tags: $tags
        description: $description
        productUsedStatus: $productUsedStatus
        originCountryId: $originCountryId
        productImage: $productImage
        productSlider1: $productSlider1
        productSlider2: $productSlider2
        productSlider3: $productSlider3
        productSlider4: $productSlider4
        quantity: $quantity
        buyPrice: $buyPrice
        sellPrice: $sellPrice
        comparePrice: $comparePrice
        commission: $commission
        discount: $discount
        brandName: $brandName
        forGender: $forGender
        releaseDate: $releaseDate
        ageRange: $ageRange
        newFeature: $newFeature
        material: $material
        boxSize: $boxSize
        packageSize: $packageSize
        warranty: $warranty
        warrantyType: $warrantyType
        weight: $weight
        weightUnit: $weightUnit
        size: $size
        sizeUnit: $sizeUnit
        length: $length
        lengthUnit: $lengthUnit
        productUnitValue: $productUnitValue
        productUnitId: $productUnitId
        isAnalog: $isAnalog
        isPublished: $isPublished
        colorId: $colorId
        companyId: $companyId
        vatId: $vatId
        categoryId: $categoryId
        subcategoryId: $subcategoryId
        subsubcategoryId: $subsubcategoryId
        shopId: $shopId
        productofferId: $productofferId
        variantOfId: $variantOfId
        publishedDate: $publishedDate
        extraFeature: $extraFeature
        extraWarrenty: $extraWarrenty
      }
    ) {
      product {
        id
        name
        code
        extraFeature
      }
    }
  }
`;
const useUpdateProduct = () => {
  const [productCreateOrUpdate, { data, loading, error }] = useMutation(
    UPDATE_PRODUCT,
    {
      refetchQueries: [
        GET_CURRENT_USER_PRODUCTS, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    productCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default useUpdateProduct;

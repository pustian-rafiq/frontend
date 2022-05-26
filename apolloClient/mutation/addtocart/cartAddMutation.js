import { gql, useMutation } from "@apollo/client";
import { GET_CART_LIST } from "../../queries/cart/useCartListQuery";

export const CREATE_ADDTO_CART = gql`
  mutation cartCreateOrUpdate(
    $productId: ID
    $quantity: Int
    $vatPercentage: Float
    $vatAmountUsd: Float
    $vatAmountBuyer: Float
    $vatAmount: Float
    $commissionUsd: Float
    $commissionBuyer: Float
    $commission: Float
    $discountUsd: Float
    $discountBuyer: Float
    $discount: Float
    $offerPriceUsd: Float
    $offerPriceBuyer: Float
    $offerPrice: Float
    $subtotalUsd: Float
    $subtotalBuyer: Float
    $subtotal: Float
  ) {
    cartCreateOrUpdate(
      input: {
        productId: $productId
        quantity: $quantity
        vatPercentage: $vatPercentage
        vatAmountUsd: $vatAmountUsd
        vatAmountBuyer: $vatAmountBuyer
        vatAmount: $vatAmount
        commissionUsd: $commissionUsd
        commissionBuyer: $commissionBuyer
        commission: $commission
        discountUsd: $discountUsd
        discountBuyer: $discountBuyer
        discount: $discount
        offerPriceUsd: $offerPriceUsd
        offerPriceBuyer: $offerPriceBuyer
        offerPrice: $offerPrice
        subtotalUsd: $subtotalUsd
        subtotalBuyer: $subtotalBuyer
        subtotal: $subtotal
      }
    ) {
      cart {
        id
        consumer {
          username
        }

        quantity
        subtotal
        subtotalUsd
        commission
        commissionUsd

        discount
        discountUsd

        offerPrice
        offerPriceUsd
        vatPercentage
        vatAmount
        vatAmountUsd

        extraField
        product {
          id
          name
          productImage
        }
      }
    }
  }
`;

const createCartMutation = (token) => {
  const [cartCreateOrUpdate, { data, loading, error }] = useMutation(
    CREATE_ADDTO_CART,
    {
      refetchQueries: [
        {
          query: GET_CART_LIST,
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
          fetchPolicy: "network-only",
        },
      ],
    }
  );
  return {
    cartCreateOrUpdate,
    data,
    loading,
    error,
  };
};

export default createCartMutation;

import { gql, useMutation } from "@apollo/client";

// query
export const GET_SINGLE_PURCHASE_ORDER = gql`
  mutation ($id: ID) {
    orderShowMutation(input: { id: $id }) {
      order {
        id
        consumer {
          username
          phone
          user {
            firstName
            lastName
          }
          country {
            name
            currenciesSymbol
          }
        }
        orderitems {
          edges {
            node {
              id
              quantity
              vatAmtUsd
              vatAmountBuyer

              commissionUsd
              commissionBuyer

              discountUsd
              discountBuyer

              offerPriceUsd
              offerPriceBuyer

              subtotalUsd
              subtotalBuyer
              product {
                name
                id
                sellPrice
              }
            }
          }
        }
        createdDate
        paymentProcess
        orderNo
        quantity
        vatPriceUsd
        vatPrice
        commissionUsd
        commission
        discountUsd
        discount
        offerPriceUsd
        offerPrice
        totalShippingCost
        totalShippingCostUsd
        totalPriceUsd
        totalPrice
        totalPayableAmtUsd
        totalPayableAmt
        isActiveCommission
        isPaid
      }
    }
  }
`;

const useSinglePurchaseOrder = () => {
  const [orderShowMutation, { data, loading, error }] = useMutation(
    GET_SINGLE_PURCHASE_ORDER
  );

  return {
    orderShowMutation,
    loading,
    error,
    data,
  };
};

export default useSinglePurchaseOrder;

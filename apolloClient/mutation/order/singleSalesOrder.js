import { gql, useMutation } from "@apollo/client";

// query
export const GET_SINGLE_SALES_ORDER = gql`
  mutation ($id: ID) {
    orderedShopProductShowMutation(input: { id: $id }) {
      orderedShopProduct {
        id
        shop {
          id
          name
          phone
          email
        }
        vendor {
          username
        }
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
              vatAmt
              commissionUsd
              commission
              discountUsd
              discount
              offerPriceUsd
              offerPrice
              subtotalUsd
              subtotal
              subtotalUsd
              product {
                id
                name
                sellPrice
              }
            }
          }
        }
        createdDate
        shopInvoiceNo
        vendorPaymentProcess
        isVendorPaid
        quantity
        commissionUsd
        commission
        discountUsd
        discount
        offerPriceUsd
        offerPrice
        totalShippingCostUsd
        totalShippingCostUsd
        totalPriceUsd
        totalPrice
        totalPayableAmtUsd
        totalPayableAmt
        isActiveCommission
      }
    }
  }
`;

const useSingleSalesOrder = () => {
  const [orderedShopProductShowMutation, { data, loading, error }] =
    useMutation(GET_SINGLE_SALES_ORDER);

  return {
    orderedShopProductShowMutation,
    loading,
    error,
    data,
  };
};

export default useSingleSalesOrder;

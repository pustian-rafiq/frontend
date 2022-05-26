import { gql, useQuery } from "@apollo/client";

// query
export const GET_CURRENT_USER_SALES_ORDER = gql`
  query {
    me {
      consumers {
        sellersOrderedhhopproducts {
          edges {
            node {
              id
              shopInvoiceNo
              vendor {
                # seller consumer
                username
                user {
                  firstName
                  lastName
                }
                country {
                  name
                  currenciesSymbol # buyer currency symbol
                }
              }

              quantity # total cart quantity
              vatAmountUsd
              vatAmount

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

              isVendorPaid
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
    }
  }
`;

const useCurrentUserSalesOrder = (token) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_SALES_ORDER, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data,
  };
};

export default useCurrentUserSalesOrder;

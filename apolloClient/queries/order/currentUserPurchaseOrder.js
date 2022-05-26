import { gql, useQuery } from "@apollo/client";

// query
export const GET_CURRENT_USER_PURCHASE_ORDER = gql`
  query {
    me {
      consumers {
        orders {
          edges {
            node {
              id

              consumer {
                username
                user {
                  firstName
                  lastName
                }

                country {
                  name
                  currenciesSymbol
                }
              }
              trxId
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

const useCurrentUserPurchaseOrder = (token) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_PURCHASE_ORDER, {
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

export default useCurrentUserPurchaseOrder;

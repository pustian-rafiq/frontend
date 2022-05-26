import { gql, useQuery } from "@apollo/client";

// query
export const GET_DIRECT_COMMISION = gql`
  query {
    directCommissions {
      edges {
        node {
          id
          trxId
          consumer {
            username
            id
            country {
              name
              usd1ToLocalCurrency
              currenciesSymbol
            }
          }
          consumerReceiver {
            username
            id
            country {
              name
              usd1ToLocalCurrency
              currenciesSymbol
            }
          }
          sendingAmt
          amtUsd
          receivingAmt
          totalSellAmt
          totalSellAmtUsd
          isPaid
          productDetails
        }
      }
    }
  }
`;

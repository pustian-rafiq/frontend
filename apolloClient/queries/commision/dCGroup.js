import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

export const GET_DC_GROUP = gql`
  query ($id: ID!) {
    directCommissionGroup(id: $id) {
      id
      payableAmountTk
      payableAmountUsd
      consumer {
        username
        id
        country {
          name
          usd1ToLocalCurrency
          currenciesSymbol
        }
      }
      directCommission {
        edges {
          node {
            consumerReceiver {
              username
            }
            id
            totalSellAmt
            totalSellAmtUsd
            sendingAmt
            receivingAmt
            amtUsd
          }
        }
      }
    }
  }
`;
const useDirectCommissionGroup = (token, id) => {
  const { data, loading, error } = useQuery(GET_DC_GROUP, {
    variables: { id: id },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "network-only",
  });

  return { data, loading, error };
};

export default useDirectCommissionGroup;

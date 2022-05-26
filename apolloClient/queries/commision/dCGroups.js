import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

export const GET_DIRECT_COMMISION_GROUPS = gql`
  {
    directCommissionGroups {
      edges {
        node {
          id
          payableAmountTk
          payableAmountUsd
          isPaid
          trxId
          directCommission {
            edges {
              node {
                id
                trxId
                consumerReceiver {
                  username
                }
              }
            }
          }
          consumer {
            username
            id
            country {
              name
              usd1ToLocalCurrency
            }
          }
        }
      }
    }
  }
`;
const useDirectCommissionGroups = (token) => {
  // const data = client.query({
  //   query: GET_DIRECT_COMMISION_GROUPS,
  //   fetchPolicy: "network-only",
  // });

  const {
    data: dcGroupsData,
    loading: dcGroupsLoading,
    error: dcGroupsError,
  } = useQuery(GET_DIRECT_COMMISION_GROUPS, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return { dcGroupsData, dcGroupsLoading, dcGroupsError };
};

export default useDirectCommissionGroups;

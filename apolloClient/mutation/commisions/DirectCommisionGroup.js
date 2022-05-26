import { gql, useMutation } from "@apollo/client";
import { GET_DIRECT_COMMISION_GROUPS } from "../../queries/commision/dCGroups";

export const DIRECT_COMMISION_GROUPS_CREATE = gql`
  mutation (
    $payableAmountTk: Float!
    $payableAmountUsd: Float!
    $directCommissions: [ID]!
  ) {
    directCommissionGroupMutation(
      input: {
        payableAmountTk: $payableAmountTk
        payableAmountUsd: $payableAmountUsd
        directCommissions: $directCommissions
      }
    ) {
      directCommissionGroup {
        id
        consumer {
          username
          id
          country {
            name
            usd1ToLocalCurrency
          }
        }
        payableAmountTk
        payableAmountUsd
      }
    }
  }
`;

const useDirectCommisionGroups = () => {
  const [directCommissionGroupMutation, { data, loading, error }] = useMutation(
    DIRECT_COMMISION_GROUPS_CREATE,
    { refetchQueries: GET_DIRECT_COMMISION_GROUPS }
  );

  return {
    directCommissionGroupMutation,
    data,
    loading,
    error,
  };
};

export default useDirectCommisionGroups;

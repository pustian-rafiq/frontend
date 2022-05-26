import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// Mutation : payment for buy product
const CREATE_PAYMENT = gql`
  mutation createPaymentMutation($orderId: ID!, $payableAmount: String!) {
    paymentMutation(
      input: { orderId: $orderId, payableAmount: $payableAmount }
    ) {
      grantTokenResponse
    }
  }
`;

//  Mutation : payment for direct commission
const CREATE_DIRECT_COMMISSION_PAYMENT = gql`
  mutation createDirectCommissionPaymentMutation(
    $directCommissionGroupId: ID!
    $payableAmount: String!
  ) {
    dcCommissionPaymentMutation(
      input: {
        directCommissionGroupId: $directCommissionGroupId
        payableAmount: $payableAmount
      }
    ) {
      grantTokenResponse
    }
  }
`;

const useCreatePaymentMutation = async (
  token,
  orderId,
  payableAmount,
  paymentType
) => {
  let data = null;

  if (paymentType === "buyProduct") {
    data = await client.mutate({
      mutation: CREATE_PAYMENT,
      variables: {
        orderId: orderId,
        payableAmount: payableAmount,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      fetchPolicy: "network-only",
    });

    return { createData: data?.data?.paymentMutation };
  } else {
    data = await client.mutate({
      mutation: CREATE_DIRECT_COMMISSION_PAYMENT,
      variables: {
        directCommissionGroupId: orderId,
        payableAmount: payableAmount,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      fetchPolicy: "network-only",
    });

    return {
      createData: data?.data?.dcCommissionPaymentMutation,
    };
  }
};

export default useCreatePaymentMutation;

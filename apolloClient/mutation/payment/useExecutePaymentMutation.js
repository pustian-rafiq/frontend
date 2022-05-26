import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// Mutation : payment execute for product buy
const EXECUTE_PAYMENT = gql`
  mutation executePaymentMutation($orderId: ID!, $paymentId: String!) {
    paymentExetuteMutation(
      input: { orderId: $orderId, paymentId: $paymentId }
    ) {
      exetuteResponseText
    }
  }
`;

// Mutation : payment execute for direct commission
const EXECUTE_DIRECT_COMMISSION_PAYMENT = gql`
  mutation executeDirectCommissionPaymentMutation(
    $directCommissionGroupId: ID!
    $paymentId: String!
  ) {
    dcCommissionPaymentExetuteMutation(
      input: {
        directCommissionGroupId: $directCommissionGroupId
        paymentId: $paymentId
      }
    ) {
      exetuteResponseText
    }
  }
`;

const useExecutePaymentMutation = async (
  token,
  orderId,
  paymentId,
  paymentType
) => {
  let data = null;

  if (paymentType === "buyProduct") {
    data = await client.mutate({
      mutation: EXECUTE_PAYMENT,
      variables: {
        orderId: orderId,
        paymentId: paymentId,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      fetchPolicy: "network-only",
    });

    return {
      executeData: data?.data?.paymentExetuteMutation,
      executeAllData: data,
    };
  } else {
    data = await client.mutate({
      mutation: EXECUTE_DIRECT_COMMISSION_PAYMENT,
      variables: {
        directCommissionGroupId: orderId,
        paymentId: paymentId,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      fetchPolicy: "network-only",
    });

    return {
      executeData: data?.data?.dcCommissionPaymentExetuteMutation,
      executeAllData: data,
    };
  }
};

export default useExecutePaymentMutation;

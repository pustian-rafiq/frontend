import Swal from "sweetalert";
import useCreatePaymentMutation from "../apolloClient/mutation/payment/useCreatePaymentMutation";
import useExecutePaymentMutation from "../apolloClient/mutation/payment/useExecutePaymentMutation";

export const bkashPaymentHandler = (token, id, payableAmount, paymentType) => {
  var paymentID = "";

  bKash.init({
    paymentMode: "checkout",

    paymentRequest: {
      amount: payableAmount,
      intent: "sale",
    },
    createRequest: async function (request) {
      const { createData, allData } = await useCreatePaymentMutation(
        token,
        id,
        payableAmount,
        paymentType
      );

      let data = JSON.parse(createData?.grantTokenResponse);

      if (data && data.paymentID != null) {
        paymentID = data.paymentID;
        bKash.create().onSuccess(data);
      } else {
        bKash.create().onError();
      }
    },

    executeRequestOnAuthorization: async function () {
      const { executeData, executeAllData } = await useExecutePaymentMutation(
        token,
        id,
        paymentID,
        paymentType
      );

      let data = JSON.parse(executeData?.exetuteResponseText);

      if (data && data.paymentID != null) {
        if (paymentType === "buyProduct") {
          window.location.href =
            "/consumer-dashboard/inventory/order/myPurchases";
        } else {
          window.location.href =
            "/consumer-dashboard/commisions/directcommision/payment";
        }
      } else {
        Swal("Payment does not successfull.");
        bKash.execute().onError();
      }
    },
  });
};

import Script from "next/script";
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import moment from "moment";
import useSinglePurchaseOrder from "../../../../../apolloClient/mutation/order/singlePurchaseOrder";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import { bkashPaymentHandler } from "../../../../../bkash/bkashScript";

const BkashPayment = ({ token }) => {
  const componentRef = useRef();
  const router = useRouter();
  const { paymentId } = router.query;

  const { orderShowMutation, data, loading } = useSinglePurchaseOrder();

  useEffect(() => {
    orderShowMutation({
      variables: { id: paymentId },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
    });
  }, []);

  if (loading || typeof data === "undefined") {
    return <Typography>Please Wait...</Typography>;
  }

  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"
      ></Script>

      <Script
        // Local
        // src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"

        // Production
        src="https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout.js"
        onLoad={() => {
          bkashPaymentHandler(
            token,
            paymentId,
            data?.orderShowMutation?.order?.totalPayableAmt,
            "buyProduct"
          );
        }}
      ></Script>

      <Box>
        <Paper sx={{ mb: 2, mt: 3, textAlign: "center" }}>
          {!loading ? (
            <Box>
              <Button
                id="bKash_button"
                variant="outlined"
                sx={{
                  mt: 3,
                  ml: 3,
                  color: "#e2136e",
                  border: "1px solid #d12053",
                }}
              >
                Pay With bKash
              </Button>

              <Box ref={componentRef} sx={{ textAlign: "center", px: 6 }}>
                <Typography sx={{ fontSize: "36px", fontWeight: 600, py: 3 }}>
                  Order Details
                </Typography>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    mt: 2,
                  }}
                >
                  <Box sx={{ textAlign: "left" }}>
                    <Typography>
                      Consumer Name:{" "}
                      {data?.orderShowMutation?.order?.consumer?.user
                        ?.firstName +
                        " " +
                        data?.orderShowMutation?.order?.consumer?.user
                          ?.lastName}
                    </Typography>
                    <Typography>
                      Consumer Phone No:{" "}
                      {data?.orderShowMutation?.order?.consumer?.phone}
                    </Typography>
                    <Typography>
                      Payment Process:{" "}
                      {data?.orderShowMutation?.order?.paymentProcess}
                    </Typography>
                    <Typography>
                      Payment Status:{" "}
                      {data?.orderShowMutation?.order?.isPaid
                        ? "Paid"
                        : "Not Paid"}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography>
                      Order No: {data?.orderShowMutation?.order?.orderNo}
                    </Typography>
                    <Typography>
                      Order Date: {data?.orderShowMutation?.order?.createdDate}
                    </Typography>
                    <Typography>
                      Print Date: {moment(new Date()).format("YYYY-MM-DD")}
                    </Typography>
                  </Box>
                </Box>

                <TableContainer sx={{ mt: "0px", background: "#ffffff" }}>
                  <Table
                    sx={{ my: 4 }}
                    aria-labelledby="tableTitle"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className="tableBorder">Serial No</TableCell>
                        <TableCell className="tableBorder">Product</TableCell>
                        <TableCell className="tableBorder">VAT</TableCell>
                        <TableCell className="tableBorder">
                          Unit Price
                        </TableCell>
                        <TableCell className="tableBorder">Quantity</TableCell>
                        <TableCell className="tableBorder">Discount</TableCell>
                        <TableCell className="tableBorder">Sub Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.orderShowMutation?.order?.orderitems?.edges.map(
                        (row, index) => (
                          <TableRow
                            hover={true}
                            tabIndex={-1}
                            key={row?.node?.id}
                            style={{ background: "rgb(247, 247, 247)" }}
                            className="rowHover"
                          >
                            <TableCell
                              className="tableBorder"
                              component="th"
                              scope="row"
                            >
                              {++index}
                            </TableCell>
                            <TableCell className="tableBorder" align="left">
                              {row?.node?.product?.name}
                            </TableCell>

                            <TableCell className="tableBorder" align="left">
                              {row?.node?.vatAmountBuyer.toFixed(2)}
                            </TableCell>

                            <TableCell className="tableBorder" align="left">
                              {row?.node?.product?.sellPrice.toFixed(2)}
                            </TableCell>
                            <TableCell className="tableBorder" align="left">
                              {row?.node?.quantity}
                            </TableCell>
                            <TableCell className="tableBorder" align="left">
                              {row?.node?.discountBuyer}
                            </TableCell>
                            <TableCell className="tableBorder" align="left">
                              {row?.node?.subtotalBuyer}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow>
                        <TableCell className="tableBorder" colSpan={5}>
                          {" "}
                        </TableCell>
                        <TableCell className="tableBorder">Total</TableCell>
                        <TableCell className="tableBorder">
                          {data?.orderShowMutation?.order?.consumer?.country
                            ?.currenciesSymbol +
                            " " +
                            data?.orderShowMutation?.order?.totalPayableAmt}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default withConsumerAuth(BkashPayment);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  if (getSessionCookie === null || !getUser || getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

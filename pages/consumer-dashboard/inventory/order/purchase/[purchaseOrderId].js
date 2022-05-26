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
import ReactToPrint from "react-to-print";
import moment from "moment";
import useSinglePurchaseOrder from "../../../../../apolloClient/mutation/order/singlePurchaseOrder";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";

const index = ({ token }) => {
  const componentRef = useRef();
  const router = useRouter();
  const { purchaseOrderId } = router.query;

  const { orderShowMutation, data, loading } = useSinglePurchaseOrder();

  useEffect(() => {
    orderShowMutation({
      variables: { id: purchaseOrderId },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
    });
  }, [purchaseOrderId]);

  if (loading || typeof data === "undefined") {
    return <Typography>Please Wait...</Typography>;
  }

  return (
    <Box>
      <Paper sx={{ mb: 2, mt: 3, textAlign: "center" }}>
        {!loading ? (
          <Box>
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" sx={{ mt: 3 }}>
                  Print Invoice
                </Button>
              )}
              content={() => componentRef.current}
            />

            <Box
              ref={componentRef}
              sx={{ textAlign: "center", px: { xs: 1, sm: 3, md: 6 } }}
            >
              <Typography sx={{ fontSize: "36px", fontWeight: 600, py: 3 }}>
                Order Details
              </Typography>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "space-between" },
                  alignItems: { xs: "center", md: "flex-end" },
                  mt: 2,
                }}
              >
                <Box sx={{ textAlign: { md: "left" } }}>
                  <Typography>
                    Consumer Name:{" "}
                    {data?.orderShowMutation?.order?.consumer?.user?.firstName +
                      " " +
                      data?.orderShowMutation?.order?.consumer?.user?.lastName}
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
                <Box sx={{ textAlign: { md: "left" } }}>
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
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "space-between" },
                  alignItems: { xs: "center", md: "flex-end" },
                  mt: 2,
                }}
              >
                <Box sx={{ textAlign: { md: "left" } }}>
                  <Typography>
                    Commission:{" "}
                    {data?.orderShowMutation?.order?.commission?.toFixed(2)}
                  </Typography>
                  <Typography>
                    Commission($):{" "}
                    {data?.orderShowMutation?.order?.commissionUsd?.toFixed(2)}
                  </Typography>
                  <Typography>
                    Vat: {data?.orderShowMutation?.order?.vatPrice?.toFixed(2)}
                  </Typography>
                  <Typography>
                    Vat($):{" "}
                    {data?.orderShowMutation?.order?.vatPriceUsd?.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { md: "left" } }}>
                  <Typography>
                    Discount:{" "}
                    {data?.orderShowMutation?.order?.discount?.toFixed(2)}
                  </Typography>
                  <Typography>
                    Discount($):{" "}
                    {data?.orderShowMutation?.order?.discountUsd?.toFixed(2)}
                  </Typography>
                  <Typography>
                    Offer Price:{" "}
                    {data?.orderShowMutation?.order?.offerPrice?.toFixed(2)}
                  </Typography>
                  <Typography>
                    Offer Price($):{" "}
                    {data?.orderShowMutation?.order?.offerPriceUsd?.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { md: "left" } }}>
                  <Typography>
                    Quantity: {data?.orderShowMutation?.order?.quantity}
                  </Typography>
                  <Typography>
                    Payable Amount:{" "}
                    {data?.orderShowMutation?.order?.totalPayableAmt?.toFixed(
                      2
                    )}
                  </Typography>
                  <Typography>
                    Payable Amount($):{" "}
                    {data?.orderShowMutation?.order?.totalPayableAmtUsd.toFixed(
                      2
                    )}
                  </Typography>
                  <Typography>
                    Shipping Cost:{" "}
                    {data?.orderShowMutation?.order?.totalShippingCost.toFixed(
                      2
                    )}
                  </Typography>
                  <Typography>
                    Shipping Cost($):{" "}
                    {data?.orderShowMutation?.order?.totalShippingCostUsd.toFixed(
                      2
                    )}
                  </Typography>
                </Box>
              </Box>

              <TableContainer sx={{ mt: "0px", background: "#ffffff" }}>
                <Table sx={{ my: 4 }} aria-labelledby="tableTitle" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableBorder">Serial No</TableCell>
                      <TableCell className="tableBorder">Product</TableCell>
                      <TableCell className="tableBorder">VAT</TableCell>
                      <TableCell className="tableBorder">Unit Price</TableCell>
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
                            {row?.node?.vatAmountBuyer?.toFixed(2)}
                          </TableCell>

                          <TableCell className="tableBorder" align="left">
                            {row?.node?.product?.sellPrice?.toFixed(2)}
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
    // </>
  );
};

export default withConsumerAuth(index);

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

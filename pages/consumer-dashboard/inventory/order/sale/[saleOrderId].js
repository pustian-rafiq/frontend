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
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import useSingleSalesOrder from "../../../../../apolloClient/mutation/order/singleSalesOrder";

const index = ({ token }) => {
  const componentRef = useRef();
  const router = useRouter();
  const { saleOrderId } = router.query;

  const { orderedShopProductShowMutation, data, loading } =
    useSingleSalesOrder();

  useEffect(() => {
    orderedShopProductShowMutation({
      variables: { id: saleOrderId },
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

            <Box ref={componentRef} sx={{ textAlign: "center", px: 6 }}>
              <Box sx={{ py: 4 }}>
                <Typography sx={{ fontSize: "36px", fontWeight: 600 }}>
                  {
                    data?.orderedShopProductShowMutation?.orderedShopProduct
                      ?.shop?.name
                  }
                </Typography>
                <Typography>
                  Email:{" "}
                  {
                    data?.orderedShopProductShowMutation?.orderedShopProduct
                      ?.shop?.email
                  }
                </Typography>
                <Typography>
                  Phone:{" "}
                  {
                    data?.orderedShopProductShowMutation?.orderedShopProduct
                      ?.shop?.phone
                  }
                </Typography>
              </Box>
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
                    {data?.orderedShopProductShowMutation?.orderedShopProduct
                      ?.consumer?.user?.firstName +
                      " " +
                      data?.orderedShopProductShowMutation?.orderedShopProduct
                        ?.consumer?.user?.lastName}
                  </Typography>
                  <Typography>
                    Consumer Phone No:{" "}
                    {
                      data?.orderedShopProductShowMutation?.orderedShopProduct
                        ?.consumer?.phone
                    }
                  </Typography>
                  <Typography>
                    Vendor Payment Process:{" "}
                    {
                      data?.orderedShopProductShowMutation?.orderedShopProduct
                        ?.vendorPaymentProcess
                    }
                  </Typography>
                  <Typography>
                    Vendor Payment Status:{" "}
                    {data?.orderedShopProductShowMutation?.orderedShopProduct
                      ?.isVendorPaid
                      ? "Paid"
                      : "Not Paid"}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography>
                    Shop Invoice No:{" "}
                    {
                      data?.orderedShopProductShowMutation?.orderedShopProduct
                        ?.shopInvoiceNo
                    }
                  </Typography>
                  <Typography>
                    Order Date:{" "}
                    {
                      data?.orderedShopProductShowMutation?.orderedShopProduct
                        ?.createdDate
                    }
                  </Typography>
                  <Typography>
                    Print Date: {moment(new Date()).format("YYYY-MM-DD")}
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
                    {data?.orderedShopProductShowMutation?.orderedShopProduct?.orderitems?.edges.map(
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
                            {row?.node?.vatAmt.toFixed(2)}
                          </TableCell>

                          <TableCell className="tableBorder" align="left">
                            {row?.node?.product?.sellPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="tableBorder" align="left">
                            {row?.node?.quantity}
                          </TableCell>
                          <TableCell className="tableBorder" align="left">
                            {row?.node?.discount}
                          </TableCell>
                          <TableCell className="tableBorder" align="left">
                            {row?.node?.subtotal}
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
                        {data?.orderedShopProductShowMutation
                          ?.orderedShopProduct?.consumer?.country
                          ?.currenciesSymbol +
                          " " +
                          data?.orderedShopProductShowMutation
                            ?.orderedShopProduct?.totalPayableAmt}
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

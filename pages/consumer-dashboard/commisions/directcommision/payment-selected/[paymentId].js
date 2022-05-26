import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import styles from "../DirectCommision.module.css";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import useDirectCommissionGroup from "../../../../../apolloClient/queries/commision/dCGroup";

import { bkashPaymentHandler } from "../../../../../bkash/bkashScript";

// Upper table section
function createData(totalpayamt, totalamtusd, trxid) {
  return {
    totalpayamt,
    totalamtusd,
    trxid,
  };
}
// Lower table section
function createPaymentData(
  sl,
  cin,
  salesprice,
  commision,
  salespriceusd,
  commisionusd
) {
  return {
    sl,
    cin,
    salesprice,
    commision,
    salespriceusd,
    commisionusd,
  };
}

function UpperTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          Total Amt for Payment
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          Total Amt USD
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          TrxID
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
function BottomTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          SL.
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          Receiver's CIN
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          Sales Price
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          Sales Price in USD($){" "}
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          Commission
        </TableCell>

        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          Commission in USD($)
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const PaymentSelected = ({ token }) => {
  const router = useRouter();
  const { paymentId } = router.query;
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, loading, error } = useDirectCommissionGroup(token, paymentId);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && data == undefined) {
    return <Typography>Loading...</Typography>;
  }

  //Show bank data and searches real time
  const paymentData = data?.directCommissionGroup?.directCommission?.edges
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row?.node?.id}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">{index}</TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.consumerReceiver?.username}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.totalSellAmt?.toFixed(2)}
          </TableCell>

          <TableCell className="tableBorder" align="left">
            {row?.node?.totalSellAmtUsd?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.sendingAmt?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.amtUsd?.toFixed(2)}
          </TableCell>
        </TableRow>
      );
    });

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
          console.log("load after load in direct commission");
          bkashPaymentHandler(
            token,
            paymentId,
            data?.directCommissionGroup?.payableAmountTk.toFixed(2),
            "directCommission"
          );
        }}
      ></Script>

      <div className={styles.paymentTopSection}>
        <Divider sx={{ mb: 5 }} />
        <div className={styles.paywithBkash}>
          <Button id="bKash_button" className={styles.paymentButton}>
            Pay with bkash Go
          </Button>
        </div>
        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Paper sx={{ width: "100%", mb: 2, mt: 3, p: "15px" }}>
            <TableContainer style={{ marginTop: "0px", background: "white" }}>
              <Table
                sx={{
                  minWidth: 750,
                }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <UpperTableHead />
                <TableBody>
                  <TableCell className="tableBorder" align="left">
                    {data?.directCommissionGroup?.payableAmountTk?.toFixed(2)}
                  </TableCell>
                  <TableCell className="tableBorder" align="left">
                    {data?.directCommissionGroup?.payableAmountUsd?.toFixed(2)}
                  </TableCell>
                  <TableCell className="tableBorder" align="left"></TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>

      <div className={styles.paymentBottomSection}>
        <div style={{ marginTop: "15px" }} className="paymentTitle">
          <span>Payment Selected Group</span>
        </div>
        <Divider sx={{ mb: 5 }} />
        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Paper
            sx={{ width: "100%", mb: 2, mt: 3 }}
            style={{
              paddingRight: "15px",
              paddingLeft: "15px",
              marginTop: "20px",
            }}
          >
            <div style={{ marginTop: "10px" }} className="searchSection">
              {" "}
            </div>
            <TableContainer style={{ marginTop: "0px", background: "white" }}>
              <Table
                sx={{
                  minWidth: 750,
                }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <BottomTableHead />
                <TableBody>
                  {/* Show tbale bodt data */}
                  {paymentData}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={
                data?.directCommissionGroup?.directCommission?.edges?.length
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default withConsumerAuth(PaymentSelected);

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

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Clear from "@mui/icons-material/Clear";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";

const rows = [
  {
    sl: 1,
    name: "Master Consumer",
    cin: "1111250",
    paymentID: "H3J72951646723462830",
    trxID: "9C89BNGWMP",
    amount: 3,
    currency: "BDT",
    createTime: "2022-03-08T07:11:02:968 GMT+0000",
    updateTime: "2022-03-08T07:12:39:658 GMT+0000",
    transactionStatus: "Completed",
    intent: "sale",
    merchantInvoiceNumber: "c996448e-0aec-4ba3-b668-78325c790891",
    refund_status: "False",
    Date: "March 8, 2022, 1:12 p.m.",
  },
  {
    sl: 2,
    name: "Master Consumer",
    cin: "1110",
    paymentID: "H3J72951646723462830",
    trxID: "9C89BNGWMP",
    amount: 3,
    currency: "BDT",
    createTime: "2022-03-08T07:11:02:968 GMT+0000",
    updateTime: "2022-03-08T07:12:39:658 GMT+0000",
    transactionStatus: "Completed",
    intent: "sale",
    merchantInvoiceNumber: "c996448e-0aec-4ba3-b668-78325c790891",
    refund_status: "False",
    Date: "March 8, 2022, 1:12 p.m.",
  },
  {
    sl: 3,
    name: "Master Consumer",
    cin: "111190",
    paymentID: "H3J72951646723462830",
    trxID: "9C89BNGWMP111",
    amount: 3,
    currency: "BDT",
    createTime: "2022-03-08T07:11:02:968 GMT+0000",
    updateTime: "2022-03-08T07:12:39:658 GMT+0000",
    transactionStatus: "Completed",
    intent: "sale",
    merchantInvoiceNumber: "c996448e-0aec-4ba3-b668-78325c790891",
    refund_status: "False",
    Date: "March 8, 2022, 1:12 p.m.",
  },
  {
    sl: 4,
    name: "Master Consumer",
    cin: "1111250",
    paymentID: "H3J72951646723462830",
    trxID: "dffhfgg56",
    amount: 3,
    currency: "BDT",
    createTime: "2022-03-08T07:11:02:968 GMT+0000",
    updateTime: "2022-03-08T07:12:39:658 GMT+0000",
    transactionStatus: "Completed",
    intent: "sale",
    merchantInvoiceNumber: "c996448e-0aec-4ba3-b668-78325c790891",
    refund_status: "False",
    Date: "March 8, 2022, 1:12 p.m.",
  },
];

const refund = ({ token, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const searchTextHandler = (e) => {
    e.preventDefault();
    setSearchText("");
  };
  const tableDatas = rows.filter((search) => {
    return search.trxID.toLowerCase().includes(searchText.toLowerCase());
  });

  const data = tableDatas.map((row) => {
    return (
      <Paper
        key={row.sl}
        elevation={5}
        sx={{ padding: 3, textAlign: "center", mb: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography>Name: {row.name}</Typography>
            <Typography>CIN: {row.cin}</Typography>
            <Typography>Payment ID: {row.paymentID}</Typography>
            <Typography>TrxID: {row.trxID}</Typography>
            <Typography>Amount: {row.amount}</Typography>
            <Typography>Currency: {row.currency}</Typography>
            <Typography>Create Time: {row.createTime}</Typography>
            <Typography>Update Time: {row.updateTime}</Typography>
            <Typography>Transaction Status: {row.transactionStatus}</Typography>
            <Typography>Intent: {row.intent}</Typography>
            <Typography>
              Merchant Invoice Number: {row.merchantInvoiceNumber}
            </Typography>
            <Typography>Refund status: {row.refund_status}</Typography>
            <Typography>Date: {row.Date}</Typography>
          </Box>
          <Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                label="Order id"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField fullWidth size="small" id="fullWidth" label="Amount" />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField fullWidth size="small" id="fullWidth" label="Reason" />
            </Box>
          </Box>
        </Box>
        <Button variant="contained">Refund Now</Button>
      </Paper>
    );
  });
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          color: "#6c757d",
          fontWeight: 700,
          fontSize: "1.75rem",
        }}
      >
        Search Payment Information By trxID
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <IconButton
            onClick={searchTextHandler}
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <Clear />
          </IconButton>
        </Paper>
        <Button
          onClick={searchTextHandler}
          variant="contained"
          sx={{ width: "200px" }}
        >
          Refresh
        </Button>
        <Divider sx={{ my: 2 }} />
      </Box>

      {data}
    </Box>
  );
};

export default withAdminAuth(refund);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  if (getSessionCookie === null || !getUser || !getUser.isStaff) {
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

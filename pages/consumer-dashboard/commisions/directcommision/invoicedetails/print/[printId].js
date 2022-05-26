import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../DirectCommision.module.css";

import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import withConsumerAuth from "../../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../../utils/getCookie";
import getCurrentUser from "../../../../../../utils/getCurrentUser";

// Upper table section
function createData(
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

const rows = [
  createData(1, 1111250, 50.0, 5.91, 0.25, 0.07),
  createData(2, 1111251, 60.0, 6.62, 0.27, 0.06),
  createData(3, 1111252, 70.0, 7.42, 0.58, 0.03),
];
// Lower table section
// function createPaymentData(sl, cin, salesprice, commision, salespriceusd, commisionusd) {
//     return {
//         sl,
//         cin,
//         salesprice,
//         commision,
//         salespriceusd,
//         commisionusd,
//     };
// }

// const paymentRows = [
//     createPaymentData(1, 'Cupcake', 305, 3.7, 67, 4.3,),
//     createPaymentData(2, 'Donut', 452, 25.0, 51, 4.9,),
//     createPaymentData(3, 'Eclair', 262, 16.0, 24, 6.0,),
//     createPaymentData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
// ];

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
          Commission in USD($)
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const PrintDetails = () => {
  const router = useRouter();
  const { invoiceId } = router.query;

  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  //Show bkash payment data
  const bkashPaymentData = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.sl}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder" align="left">
            {row.sl}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.cin}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.salesprice}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.commision}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.salespriceusd}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.commisionusd}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <div className={styles.paymentTopSection}>
        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Paper
            sx={{ width: "100%", mb: 2, mt: 3 }}
            style={{
              paddingRight: "15px",
              paddingLeft: "15px",
              marginTop: "20px",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  padding: "8px 0px",
                  fontWeight: "bold",
                  margin: "15px auto",
                  width: "65%",
                }}
              >
                Successfully Paid Direct Commission
              </Typography>

              <Grid container spacing={2} sx={{ my: "20px" }}>
                <Grid item xs={8} md={8} lg={8}>
                  <strong>Invoice No</strong> : 47 <br />
                  <strong>Sender Consumer Name</strong> : MasterConsumer <br />
                  <strong>Sender Consumer Address</strong> : <br />
                  <strong>Sender Consumer Phone No</strong> : 8801711571561{" "}
                  <br />
                  <strong>Order date</strong> : Feb 22, 2022
                </Grid>

                <Grid item xs={4} md={4} lg={4}>
                  <strong>Payment Total </strong>: 5.91 <br />
                  <strong>Payment Total USD </strong>: 0.069
                  <br />
                  <strong>Transaction Id</strong>: 9BM40NLYRY
                  <br />
                  <strong>Payment Process </strong>: bKash
                  <br />
                  <strong>Print date </strong>: Mar 03, 2022
                </Grid>
              </Grid>
            </Box>

            {/* header of the table start  */}

            <Box>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  padding: "8px 0px",
                  fontWeight: "bold",
                  margin: "25px auto",
                  border: "1px solid rgb(199, 194, 194)",
                  width: "35%",
                }}
              >
                Payment Selected Group
              </Typography>
            </Box>
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
                  {/* Show table bodt data */}
                  {bkashPaymentData}

                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 93 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={rows.length}
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

export default withConsumerAuth(PrintDetails);

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

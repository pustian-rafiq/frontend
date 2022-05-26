import React, { useState } from "react";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import styles from "../DirectCommision.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
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

// Upper table section
function createData(totalpayamt, totalamtusd, trxid) {
  return {
    totalpayamt,
    totalamtusd,
    trxid,
  };
}

const rows = [
  createData(3.7, 67, "we3445565rfgf"),
  createData(25.0, 51, "we3445565rfgf"),
  createData(16.0, 24, "we3445565rfgf"),
  createData(6.0, 24, "we3445565rfgf"),
];
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

const paymentRows = [
  createPaymentData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createPaymentData(2, "Donut", 452, 25.0, 51, 4.9),
  createPaymentData(3, "Eclair", 262, 16.0, 24, 6.0),
  createPaymentData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
];

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

const InvoiceDetails = () => {
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
            {row.totalpayamt}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.totalamtusd}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.trxid}
          </TableCell>
        </TableRow>
      );
    });
  //Show bank data and searches real time
  const paymentData = paymentRows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.sl}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">{row.sl}</TableCell>
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
            <div style={{ marginTop: "10px" }} className={styles.topSection}>
              {" "}
            </div>
            <div style={{ marginTop: "10px" }} className={styles.invoiceBorder}>
              <Link
                href={`../../../../consumer-dashboard/commisions/directcommision/invoicedetails/print/${invoiceId}`}
              >
                <Button className={styles.printButton}>Print Commision</Button>
              </Link>
              <div className={styles.title}>
                Successfully Paid Direct Commission
              </div>
            </div>
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
                  {/* Show tbale bodt data */}
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
      <div className={styles.paymentBottomSection}>
        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Paper
            sx={{ width: "100%", mb: 2, mt: 3 }}
            style={{
              paddingRight: "15px",
              paddingLeft: "15px",
              marginTop: "20px",
            }}
          >
            <div style={{ marginTop: "10px" }} className={styles.topSection}>
              {" "}
            </div>
            <div className={styles.paymentBorder}>
              <div className={styles.paymentSelectedTitle}>
                <span>Payment Selected Group</span>
              </div>
              <Divider />
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

export default withConsumerAuth(InvoiceDetails);

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

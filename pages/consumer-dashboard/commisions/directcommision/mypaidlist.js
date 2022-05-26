import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./DirectCommision.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";

import ClearIcon from "@mui/icons-material/Clear";
import { Divider } from "@mui/material";
import Link from "next/link";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

function createData(sl, createdate, commisionid, totalamt, totalamtusd, trxid) {
  return {
    sl,
    createdate,
    commisionid,
    totalamt,
    totalamtusd,
    trxid,
  };
}

const rows = [
  createData(
    1,
    "Sept. 15, 2021, 12:34 p.m.",
    ["151"],
    3.7,
    67,
    "we3445565rfgf"
  ),
  createData(
    2,
    "Sept. 15, 2021, 12:34 p.m.",
    ["151"],
    25.0,
    51,
    "we3445565rfgf"
  ),
  createData(
    3,
    "Sept. 15, 2021, 12:34 p.m.",
    ["151"],
    16.0,
    24,
    "we3445565rfgf"
  ),
  createData(
    4,
    "Sept. 15, 2021, 12:34 p.m.",
    ["151"],
    6.0,
    24,
    "we3445565rfgf"
  ),
];

function EnhancedTableHead(props) {
  const { onRequestSort } = props;

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
          Payment Date
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
          Created Date
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
          Total Amt
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
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const MyPaidList = () => {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const searchTextHandler = () => {
    setSearchText("");
  };
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
  //Show bank data and searches real time
  const tableDatas = rows.filter((search) => {
    return search.createdate.toLowerCase().includes(searchText.toLowerCase());
  });

  const tableData = tableDatas
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
            {row.createdate}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.commisionid}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.totalamt}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.totalamtusd}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.trxid}
          </TableCell>
          <TableCell className="tableBorder " align="left">
            <Link
              href={`../../../../consumer-dashboard/commisions/directcommision/invoicedetails/${row.sl}/`}
            >
              <span
                title="Click for details information"
                className={styles.linkButton}
              >
                {" "}
                <VisibilityIcon />
              </span>
            </Link>
            <Link
              href={`../../../../dashboard/commisions/directcommision/invoicedetails/${row.sl}/`}
            >
              <span title="Click for print" className={styles.linkButton}>
                {" "}
                <PrintIcon />
              </span>
            </Link>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <div>
        <div className="paymentTitle">
          <span>Paid Direct Commission Payment</span>
        </div>
        <Divider sx={{ mb: 5 }} />

        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Paper
            sx={{ width: "100%", mb: 2, mt: 3 }}
            style={{ paddingRight: "15px", paddingLeft: "15px" }}
          >
            <div style={{ marginTop: "10px" }} className="searchSection">
              <div className="searchLabel">Search</div>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for name, address and others.."
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <ClearIcon className="clearIcon" onClick={searchTextHandler} />
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
                <EnhancedTableHead />
                <TableBody>
                  {/* Show tbale bodt data */}
                  {tableData}

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
export default withConsumerAuth(MyPaidList);

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

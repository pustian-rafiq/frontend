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
import ClearIcon from "@mui/icons-material/Clear";
import { Divider } from "@mui/material";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

function createData(
  sl,
  cin,
  salesprice,
  commision,
  salespriceusd,
  commisionusd,
  trxid,
  details
) {
  return {
    sl,
    cin,
    salesprice,
    commision,
    salespriceusd,
    commisionusd,
    trxid,
    details,
  };
}

const rows = [
  createData(1, "1111250", 50, 5.91, 0.58, 67, "we3445565rfgf", "Details"),
  createData(2, "1111251", 50, 5.91, 0.58, 51, "we3445565rfgf", "Details"),
  createData(3, "1111252", 50, 5.91, 0.58, 24, "we3445565rfgf", "Details"),
  createData(4, "1111253", 50, 5.91, 0.58, 24, "we3445565rfgf", "Details"),
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
          Receiver Consumer CIN
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
          Sales Price in USD ($)
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
          Details
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const Paid = () => {
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
    return (
      search.cin.toLowerCase().includes(searchText.toLowerCase()) ||
      search.trxid.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  var totalCommision = 0;
  var totalCommisionUsd = 0;
  const tableData = tableDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      totalCommision += row.commision;
      totalCommisionUsd += row.commisionusd;
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
          <TableCell className="tableBorder" align="left">
            {row.trx}
          </TableCell>
          <TableCell className="tableBorder " align="left">
            {" "}
            {row.details}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <div>
        <div className="paymentTitle">
          <span>My Paid Commissions</span>
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
                  <TableRow
                    hover={true}
                    tabIndex={-1}
                    style={{ background: "rgb(247, 247, 247)" }}
                  >
                    <TableCell>Total</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">{totalCommision}</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">{totalCommisionUsd}</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"> </TableCell>
                  </TableRow>

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
export default withConsumerAuth(Paid);

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

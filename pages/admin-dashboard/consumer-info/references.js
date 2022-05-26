import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
function createData(sl, cin, name, phone, ref1, ref2, totalref, refered_by) {
  return {
    sl,
    cin,
    name,
    phone,
    ref1,
    ref2,
    totalref,
    refered_by,
  };
}

const rows = [
  createData(1, "1114138", "Md.Rabiul Islam", "8801735414183", 0, 0, 0, 6),
  createData(2, "1114138", "Md.Rabiul Islam", "8801735414183", 0, 0, 0, 6),
  createData(3, "1114138", "Md.Rabiul Islam", "8801735414183", 0, 0, 0, 6),
  createData(4, "1114138", "Md.Rabiul Islam", "8801735414183", 0, 0, 0, 6),
  createData(5, "1114138", "Md.Rabiul Islam", "8801735414183", 0, 0, 0, 6),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          {" "}
          SL.
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          CIN
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          {" "}
          Name
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          Phone
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          Ref-1
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          Ref-2
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          Total Ref
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          Refered By
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { xs: "12px", md: "15px" } }}
        >
          {" "}
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Reference = ({ token, currentUser }) => {
  const [searchText, setSearchText] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sl");
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
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
    return search.cin.toLowerCase().includes(searchText.toLowerCase());
    //   search.calories.toLowerCase().includes(searchText.toLowerCase()) ||
    //search.fat.toLowerCase().includes(searchText.toLowerCase())
  });
  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      // const labelId = `enhanced-table-checkbox-${index}`;

      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.sl}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.sl}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.cin}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.name}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.phone}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.ref1}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.ref2}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.totalref}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.refered_by}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" }, width: "21%" }}
          >
            <Link
              href={`/admin-dashboard/consumer-info/leftreferenceDetails/${row.sl}/`}
              passHref
            >
              <Button
                sx={{
                  margin: "2px 2px 0px 0px",
                  color: "#fff",
                  background: "#4F5ECE",
                  textTransform: "capitalize",
                  fontSize: { xs: "12px", sm: "15px" },
                  ":hover": { background: "#15258e" },
                  padding: "1px 0px",
                }}
              >
                Ref-1
              </Button>
            </Link>
            <Link
              href={`/admin-dashboard/consumer-info/aboverootDetails/${row.sl}/`}
              passHref
            >
              <Button
                sx={{
                  margin: "2px 2px 0px 0px",
                  color: "#fff",
                  background: "#0DA8EE",
                  textTransform: "capitalize",
                  fontSize: { xs: "12px", sm: "15px" },
                  ":hover": { background: "#1799d1" },
                  padding: "1px 0px",
                }}
              >
                Root
              </Button>
            </Link>
            <Link
              href={`/admin-dashboard/consumer-info/rightreferenceDetails/${row.sl}/`}
              passHref
            >
              <Button
                sx={{
                  margin: "2px 2px 0px 0px",
                  color: "#fff",
                  background: "#4F5ECE",
                  textTransform: "capitalize",
                  fontSize: { xs: "12px", sm: "15px" },
                  ":hover": { background: "#15258e" },
                  padding: "1px 0px",
                }}
              >
                Ref-2
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "15px", md: "25px", lg: "30px" },
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
          mb: 1,
        }}
      >
        All Consumers Report With Roots and References
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3 }}
          style={{ paddingRight: "10px", paddingLeft: "10px" }}
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
              // sx={{ minWidth: 750 }}
              sx={{
                "& .MuiTableRow-root:hover": {
                  backgroundColor: "red",
                },
                minWidth: 750,
              }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={tableDatas.length}
              />
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
            count={tableDatas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default withAdminAuth(Reference);

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

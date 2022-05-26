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

import TableSortLabel from "@mui/material/TableSortLabel";
import ClearIcon from "@mui/icons-material/Clear";
import { Divider, Typography } from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import Image from "next/image";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

function createData(
  no,
  employee,
  month,
  grosssalary,
  receiveamt,
  remaingamt,
  trxid,
  bkash
) {
  return {
    no,
    employee,
    month,
    grosssalary,
    receiveamt,
    remaingamt,
    trxid,
    bkash,
  };
}

const rows = [
  createData(
    1,
    "Nazmul1",
    "January",
    "10000",
    "25000",
    "30000",
    "40000",
    "9C2876EU9M",
    "01991166550"
  ),
  createData(
    2,
    "Nazmul2",
    "January",
    "20000",
    "25000",
    "30000",
    "40000",
    "9C2876EU9M",
    "01991166550"
  ),
  createData(
    3,
    "Nazmul3",
    "January",
    "30000",
    "25000",
    "30000",
    "40000",
    "9C2876EU9M",
    "01991166550"
  ),
  createData(
    4,
    "Nazmul4",
    "January",
    "30000",
    "25000",
    "30000",
    "40000",
    "9C2876EU9M",
    "01991166550"
  ),
  createData(
    5,
    "Nazmul5",
    "January",
    "40000",
    "25000",
    "30000",
    "40000",
    "9C2876EU9M",
    "01991166550"
  ),
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

const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "photo",
    numeric: false,
    disablePadding: false,
    label: "Photo",
  },
  {
    id: "employee",
    numeric: false,
    disablePadding: false,
    label: "Employee",
  },
  {
    id: "month",
    numeric: false,
    disablePadding: false,
    label: "Month",
  },
  {
    id: "grosssalary",
    numeric: false,
    disablePadding: false,
    label: "Gross Salary",
  },
  {
    id: "receiveamt",
    numeric: false,
    disablePadding: false,
    label: "Receive Amount",
  },
  {
    id: "Remaining Amount",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "trxid",
    numeric: false,
    disablePadding: false,
    label: "TrxID",
  },
  {
    id: "bkash",
    numeric: false,
    disablePadding: false,
    label: "Bkash Account",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
            sortDirection={orderBy === headCell.id ? order : false}
            className="tableBorder"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const PaidSalary = ({ token, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    return (
      search.employee.toLowerCase().includes(searchText.toLowerCase()) ||
      search.phone.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.no}
          style={{ background: "rgb(247, 247, 247)" }}
          className="rowHover"
        >
          <TableCell
            className="tableBorder"
            id={labelId}
            component="th"
            scope="row"
          >
            {row.no}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            <Typography
              variant="div"
              component="div"
              sx={{
                padding: "5px",
                borderRadius: "50%",
                width: "70",
                height: "70",
              }}
            >
              <img
                src="/images/pp.jpg"
                width="70"
                height="70"
                // style={{ borderRadius: "50%", width: "70", height: "70" }}
              />
            </Typography>
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.employee}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.month}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.grosssalary}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.receiveamt}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.remaingamt}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.trxid}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.bkash}
          </TableCell>
        </TableRow>
      );
    });
  return (
    <div>
      <Typography
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
        }}
      >
        Paid Salary Employee Sheet
      </Typography>
      <Divider />

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3 }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              background: "#0DA8EE",
              width: "145px",
              fontSize: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              float: "right",
              color: "#fff",
              borderRadius: "20px",
              mt: 2,
              cursor: "pointer",
              py: 1,
            }}
          >
            <Add />
            <Link href="/admin-dashboard/employee/create-salary/">
              Create Salary
            </Link>
          </Typography>

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
                      height: (dense ? 33 : 53) * emptyRows,
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
  );
};
export default withAdminAuth(PaidSalary);

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

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
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

const rows = [
  { sl: 1, country_name: "Bangladesh", total_consumer: 5806 },
  { sl: 2, country_name: "Iraq", total_consumer: 2 },
  { sl: 3, country_name: "Oman", total_consumer: 2 },
  { sl: 4, country_name: "Russian Federation", total_consumer: 1 },
  { sl: 5, country_name: "Pakistal", total_consumer: 1 },
  { sl: 6, country_name: "India", total_consumer: 1 },
  { sl: 7, country_name: "Afghanistan", total_consumer: 1 },
  { sl: 8, country_name: "United States of America", total_consumer: 1 },
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
    id: "sl",
    numeric: false,
    disablePadding: true,
    label: "Serial",
  },

  {
    id: "country_name",
    numeric: false,
    disablePadding: false,
    label: "Country Name",
  },
  {
    id: "total_consumer",
    numeric: false,
    disablePadding: false,
    label: "Total Consumer",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
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
            align="center"
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
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const countryWise = ({ token, currentUser }) => {
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
      search.country_name.toLowerCase().includes(searchText.toLowerCase()) ||
      search.total_consumer.toLowerCase().includes(searchText.toLowerCase())
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
          key={row.sl}
          style={{ background: "rgb(247, 247, 247)" }}
          className="rowHover"
        >
          <TableCell
            className="tableBorder"
            id={labelId}
            component="th"
            scope="row"
            align="center"
          >
            {row.sl}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row.country_name}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row.total_consumer}
          </TableCell>
          <TableCell
            className="tableBorder "
            align="center"
            style={{ width: "10%" }}
          >
            <Button variant="contained" color="info">
              Details
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
          Country-wise Consumer
        </Typography>
      </Box>

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
  );
};

export default withAdminAuth(countryWise);

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

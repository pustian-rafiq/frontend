import React, { useState } from "react";
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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { Divider } from "@mui/material";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";

const rows = [
  {
    sl: 1,
    vendor: 111001,
    order_no: 1100810123823,
    ordered_by: 111003,
    date: "1/1/2022",
    vat: 12.3,
  },
  {
    sl: 2,
    vendor: 111001,
    order_no: 1100810123823,
    ordered_by: 111003,
    date: "1/1/2022",
    vat: 46.4,
  },
  {
    sl: 3,
    vendor: 111001,
    order_no: 1100810123823,
    ordered_by: 111003,
    date: "1/1/2022",
    vat: 54,
  },
  {
    sl: 4,
    vendor: 111001,
    order_no: 1100810123823,
    date: "1/1/2022",
    ordered_by: 111003,
    date: "1/1/2022",
    vat: 4.9,
  },
  {
    sl: 5,
    vendor: 111001,
    order_no: 1100810123823,
    date: "1/1/2022",
    ordered_by: 111003,
    date: "1/1/2022",
    vat: 6.3,
  },
  {
    sl: 6,
    vendor: 111001,
    order_no: 1100810123823,
    date: "1/1/2022",
    ordered_by: 111003,
    date: "1/1/2022",
    vat: 23.37,
  },
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
    numeric: true,
    disablePadding: true,
    label: "SL.",
  },
  {
    id: "order_no",
    numeric: false,
    disablePadding: false,
    label: "Order No.",
  },
  {
    id: "vendor",
    numeric: false,
    disablePadding: false,
    label: "Vendor",
  },
  {
    id: "order_by",
    numeric: false,
    disablePadding: false,
    label: "Ordered By",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Created Date",
  },
  {
    id: "vat",
    numeric: false,
    disablePadding: false,
    label: "VAT",
  },
];
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ paddingLeft: "10px" }}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="tableBorder headbackground"
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
        <TableCell
          className="tableBorder headbackground"
          padding="checkbox"
          style={{ width: "10%", paddingLeft: "15px" }}
        >
          Select{" "}
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
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

const VatList = ({ token, currentUser }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [vat, setVat] = useState(0);

  console.log("selected:::", selected);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sl) => {
    const selectedIndex = selected.indexOf(sl);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (sl) => selected.indexOf(sl) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //Show vat data
  var totalVat = 0;
  const tableData = stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const isItemSelected = isSelected(row.sl);
      const labelId = `enhanced-table-checkbox-${index}`;
      totalVat += row.vat;
      return (
        <TableRow
          hover
          onClick={(event) => handleClick(event, row.sl)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.sl}
          selected={isItemSelected}
          className="rowHover"
        >
          <TableCell className="tableBorder" align="left">
            {row.sl}
          </TableCell>
          <TableCell
            component="th"
            id={labelId}
            scope="row"
            className="tableBorder"
          >
            {row.order_no}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.vendor}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.ordered_by}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.date}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.vat}
          </TableCell>
          <TableCell className="tableBorder" padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
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
          marginBottom: "10px",
        }}
      >
        VAT
      </Typography>
      <Divider />
      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, pb: 3 }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "#6c757d",
              fontWeight: 700,
              fontSize: "1.75rem",
              pb: 2,
            }}
          >
            Total Vat:
            {selected
              .map((sl) => rows.find((row) => row.sl === sl))
              .map((vats) => vats.vat)
              .reduce(
                (previousValue, currentValue) =>
                  parseFloat(previousValue) + parseFloat(currentValue),
                0
              )}{" "}
            &#2547;
          </Typography>
          <TableContainer style={{ marginTop: "0px", background: "white" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
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
            rowsPerPageOptions={[5, 10, 25]}
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
export default withAdminAuth(VatList);

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

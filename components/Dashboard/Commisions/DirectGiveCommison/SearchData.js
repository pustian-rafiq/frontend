import * as React from "react";
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
import Button from "@mui/material/Button";
import Link from "next/link";
import { visuallyHidden } from "@mui/utils";
//import styles from '../styles/DataTable.module.css'

import ClearIcon from "@mui/icons-material/Clear";

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
function stableSort(array = [], comparator) {
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
    label: "SL.",
  },
  {
    id: "cin",
    numeric: true,
    disablePadding: false,
    label: "Receiver's CIN",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "gender",
    numeric: true,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "country",
    numeric: true,
    disablePadding: false,
    label: "Country",
  },
  {
    id: "division",
    numeric: true,
    disablePadding: false,
    label: "Division",
  },
  {
    id: "district",
    numeric: true,
    disablePadding: false,
    label: "District",
  },
  {
    id: "select",
    numeric: true,
    disablePadding: false,
    label: "Select",
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
            //align={headCell.numeric ? 'right' : 'left'}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              paddingLeft: "10px",
              background: "rgb(247, 247, 247)",
              background: "rgb(235, 235, 235)",
            }}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const SearchData = ({ showCommisionData }) => {
  const [searchText, setSearchText] = React.useState("");

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
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
  const tableDatas = showCommisionData.filter((search) => {
    return (
      search?.node?.username.toLowerCase().includes(searchText.toLowerCase()) ||
      search?.node?.phone
        ?.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  });
  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      // const labelId = `enhanced-table-checkbox-${index}`;

      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.node.id}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell
            component="th"
            // id={labelId}
            scope="row"
            className="tableBorder"
          >
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.username}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.phone}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.user?.firstName} {row?.node?.user?.lastName}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.gender}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.consumeraddresses?.country?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.consumeraddresses?.divisionOrState?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.consumeraddresses?.districtOrCity?.name}
          </TableCell>
          <TableCell className="tableBorder " align="left">
            <Link
              href={{
                pathname: `/../../../../consumer-dashboard/commisions/directcommision/commisionCreate`,
                query: {
                  id: `${row.node.id}`,
                },
              }}
              // as={`/../../../../consumer-dashboard/commisions/directcommision/commisionCreate`}
              //href={`/../../../../consumer-dashboard/commisions/directcommision/commisionCreat/`}

              //</TableCell>href={"../../../../consumer-dashboard/commisions/directcommision/commisionCreate"}
            >
              <Button className="selectButton ">Select</Button>
            </Link>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
      <Paper sx={{ width: "100%", mb: 2, mt: 3, px: "15px", pt: 2 }}>
        <Box sx={{ my: "10px" }} className="searchSection">
          <Box className="searchInput">
            <input
              type="text"
              placeholder="Search for CIN or Phone Number..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <ClearIcon className="clearIcon" onClick={searchTextHandler} />
          </Box>
        </Box>
        <TableContainer sx={{ mt: 2, background: "white" }}>
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
      {/* <div>
        <span>Total:</span>
      </div> */}
    </Box>
  );
};
export default SearchData;

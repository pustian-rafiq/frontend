import React, { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Button, Divider, Grid, TextField } from "@mui/material";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

function createData(no, photo, employee, designation, email, contact) {
  return {
    no,
    photo,
    employee,
    designation,
    email,
    contact,
  };
}
const rows = [
  createData(
    1,
    "photo",
    "Md. Golam  Mim",
    "React Developer",
    "mim.cse32@gmail.com",
    "018988789er"
  ),
  createData(
    2,
    "photo",
    "Md. Hakkani Mim",
    "React Developer",
    "mim.cse32@gmail.com",
    "018988789er"
  ),
  createData(
    3,
    "photo",
    "Md.Mim",
    "React Developer",
    "mim.cse32@gmail.com",
    "018988789er"
  ),
  createData(
    4,
    "photo",
    "Md. Rafiqul Islam",
    "React Developer",
    "mim.cse32@gmail.com",
    "018988789er"
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
    numeric: true,
    disablePadding: true,
    label: "SL.",
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
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "contact",
    numeric: false,
    disablePadding: false,
    label: "Contact",
  },
  // {
  //   id: 'select',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Select All',
  // },
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
          Select All{" "}
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Total selected data {numSelected}
        </Typography>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const IdCardGenerate = ({ token, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const searchTextHandler = () => {
    setSearchText("");
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.employee);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, employee) => {
    const selectedIndex = selected.indexOf(employee);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, employee);
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

  const isSelected = (employee) => selected.indexOf(employee) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  //Show bank data and searches real time
  const tableDatas = rows.filter((search) => {
    return search.employee.toLowerCase().includes(searchText.toLowerCase());
  });

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const isItemSelected = isSelected(row.employee);
      const labelId = `enhanced-table-checkbox-${index}`;

      return (
        <TableRow
          hover
          onClick={(event) => handleClick(event, row.employee)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.employee}
          selected={isItemSelected}
          className="rowHover"
        >
          <TableCell className="tableBorder" align="left">
            {row.no}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.photo}
          </TableCell>

          <TableCell
            component="th"
            id={labelId}
            scope="row"
            className="tableBorder"
          >
            {row.employee}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.designation}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.email}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.contact}
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
          marginBottom: "20px",
        }}
      >
        ID CARD GENERATE
      </Typography>
      <Divider />
      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, pb: 3 }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <EnhancedTableToolbar numSelected={selected.length} />
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item md={6}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={companyList}
                getOptionLabel={(option) => option.name}
                //defaultValue={employeeList[0]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Companies*"
                    placeholder="Search by company"
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                label="Expired Date*"
              />
            </Grid>
          </Grid>
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
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
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

          <Button
            sx={{
              background: "#c12f2a",
              color: "#fff",
              textTransform: "capitalize",
              ":hover": {
                background: "#fb160a",
              },
            }}
          >
            Now Generate ID Card
          </Button>
        </Paper>
      </Box>
    </div>
  );
};
export default withAdminAuth(IdCardGenerate);

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

const companyList = [{ name: "Ehsan Marketting" }, { name: "Pran and RFL" }];

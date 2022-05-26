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
import { Button, Divider, FormControlLabel, Switch } from "@mui/material";
import Image from "next/image";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

const rows = [
  {
    sl: 1,
    photo: "https://ehsanmarketing.com/media/images/consumer/Mamun_5LVLp0H.jpg",
    name: "Sayed Abdullah Al Mamun",
    cin: 111003,
    showing: "false",
  },
  {
    sl: 2,
    photo: "https://ehsanmarketing.com/media/images/consumer/Mamun_5LVLp0H.jpg",
    name: "Mohammad Ruhul Amin",
    cin: 111002,
    showing: "false",
  },
  {
    sl: 3,
    photo: "https://ehsanmarketing.com/media/images/consumer/Mamun_5LVLp0H.jpg",
    name: "Md. Zulfikar Ali Mondal",
    cin: 111008,
    showing: "false",
  },
  {
    sl: 4,
    photo: "https://ehsanmarketing.com/media/images/consumer/Mamun_5LVLp0H.jpg",
    name: "Md. Harun Or Rashid",
    cin: 111005,
    showing: "false",
  },
  {
    sl: 5,
    photo: "https://ehsanmarketing.com/media/images/consumer/Mamun_5LVLp0H.jpg",
    name: "Md. Mofazzal Hossain",
    cin: 111007,
    showing: "false",
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
    id: "sl",
    numeric: true,
    label: "SL.",
  },
  {
    id: "photo",
    numeric: false,
    label: "Photo",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "cin",
    numeric: false,
    label: "CIN",
  },
  {
    id: "showing",
    numeric: false,
    label: "Showing",
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
            align="center"
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
          sx={{ textAlign: "center" }}
        >
          Edit
        </TableCell>
        <TableCell
          sx={{ textAlign: "center" }}
          className="tableBorder headbackground"
        >
          <FormControlLabel
            control={
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            }
            label="Select"
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

const allConsumer = ({ token, currentUser }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [vat, setVat] = useState(0);

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
        <TableRow hover key={row.sl} className="rowHover">
          <TableCell className="tableBorder" align="center">
            {row.sl}
          </TableCell>
          <TableCell
            component="th"
            id={labelId}
            scope="row"
            className="tableBorder"
            align="center"
          >
            <img
              src={row.photo}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row.name}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row.cin}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row.showing}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            <Button variant="contained" color="warning">
              Update
            </Button>
          </TableCell>
          <TableCell className="tableBorder" sx={{ textAlign: "center" }}>
            <Checkbox
              onChange={(event) => handleClick(event, row.sl)}
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
        Select Consumer for Slider
      </Typography>
      <Divider />
      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, pb: 3 }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
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

          <Box
            sx={{
              display: { md: "flex" },
              justifyContent: { sm: "space-between" },
              textAlign: { xs: "center" },
            }}
          >
            <FormControlLabel
              control={<Switch />}
              label="Add or Remove Consumer in Slide"
            />
            <Button variant="contained" color="info">
              Reset All
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="contained" color="info">
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default withAdminAuth(allConsumer);

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

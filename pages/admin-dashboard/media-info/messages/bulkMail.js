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
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";

import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const rows = [
  { sl: 1, cin: "1117111", email: "1117111@worldehsan.com" },
  { sl: 2, cin: "1117110", email: "1117110@worldehsan.com" },
  { sl: 3, cin: "1117109", email: "1117109@worldehsan.com" },
  { sl: 4, cin: "1117108", email: "1117108@worldehsan.com" },
  { sl: 5, cin: "1117107", email: "1117107@worldehsan.com" },
  { sl: 6, cin: "1117106", email: "1117106@worldehsan.com" },
  { sl: 7, cin: "1117105", email: "1117105@worldehsan.com" },
  { sl: 8, cin: "1117104", email: "1117104@worldehsan.com" },
  { sl: 9, cin: "1117103", email: "1117103@worldehsan.com" },
  { sl: 10, cin: "1117102", email: "1117102@worldehsan.com" },
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
    numeric: false,
    disablePadding: true,
    label: "Serial",
  },

  {
    id: "cin",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
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
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const bulkMail = ({ token, currentUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
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
      search.email.toLowerCase().includes(searchText.toLowerCase()) ||
      search.cin.toLowerCase().includes(searchText.toLowerCase())
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
          >
            {row.sl}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.cin}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.email}
          </TableCell>
        </TableRow>
      );
    });
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
          Bulk Mail
        </Typography>
        <Button
          onClick={() => setModalOpen(true)}
          variant="contained"
          color="error"
          sx={{ my: 1 }}
        >
          Compose Mail
        </Button>
      </Box>

      <div style={{ marginTop: "10px" }} className="searchSection">
        <div className="searchLabel">Search</div>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for name, email and serial.."
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
          aria-labelledby="tablecin"
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

      {/* ==========================Modal Start======================= */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <TextField
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              id="outlined-required"
              label="To"
              defaultValue={rows.map((data) => data.email)}
              placeholder="Enter Email/s"
            />
            <TextField
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              id="outlined-required"
              label="To BCC"
              placeholder="Enter Email/s"
            />
            <TextField
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              id="outlined-required"
              label="Subject"
              placeholder="Enter Subject"
            />
            <TextField
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              multiline
              rows={4}
              id="outlined-required"
              label="Message"
              placeholder="Enter Your Message.."
            />
            <Box sx={{ textAlign: "right" }}>
              <Button
                onClick={() => setModalOpen(false)}
                variant="contained"
                color="error"
                sx={{ mx: 2 }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="info">
                Reply
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {/* ==========================Modal End======================= */}
    </Paper>
  );
};

export default withAdminAuth(bulkMail);

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

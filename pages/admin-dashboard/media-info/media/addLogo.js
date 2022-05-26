import React, { useState, useRef } from "react";
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
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
//For csv or excel
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";

//For pdf
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";
import { CopyToClipboard } from "react-copy-to-clipboard";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
function createData(sl, name, logo) {
  return {
    sl,
    name,
    logo,
  };
}

const data = [
  {
    sl: 1,
    name: "Ehsan Marketting",
    logo: "Download",
  },
];
const rows = [
  createData(1, "Ehsan Marketing1", "Download"),
  createData(2, "Ehsan Marketing4", "Download"),
  createData(3, "Ehsan Marketing3", "Download"),
  createData(4, "Ehsan Marketing7", "Download"),
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
    label: "Serial No.",
  },

  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "logo",
    numeric: false,
    disablePadding: false,
    label: "Logo",
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
//Export csv data from table
const csvReport = {
  data: rows,
  filename: "EhsanMarketting.csv",
};

const AddLogo = ({ token, currentUser }) => {
  const componentRef = useRef();
  const ref = useRef();

  const [isCopied, setIsCopied] = useState(false);

  const codeSnippet = `
    const a = 10, b = 20;
    const sum = a + b;
    console.log(sum);
    `;

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  // const [state, copyToClipboard] = useCopyToClipboard();
  const [copy, setCopy] = useState(false);
  const onCopy = () => {
    setCopy({ copied: true });
  };

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

  // Export data to excel file
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  //  For pdf download
  const printDocument = () => {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("EhsanMarketting.pdf");
    });
  };

  //Show bank data and searches real time
  const tableDatas = rows.filter((search) => {
    return search.name.toLowerCase().includes(searchText.toLowerCase());
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
            {row.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.logo}
          </TableCell>
          <TableCell
            className="tableBorder "
            align="left"
            style={{ width: "15%" }}
          >
            <Link
              href={`/admin-dashboard/employee/designation-update/${row.sl}/`}
              passHref
            >
              <Typography
                variant="span"
                component="span"
                sx={{
                  background: "#0DA8EE",
                  borderRadius: "3px",
                  fontSize: "15px",
                  mr: 1,
                  padding: "5px 1px",
                  color: "#fff",
                }}
              >
                <Tooltip title="Edit Designation">
                  <IconButton sx={{ color: "#fff" }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Link>
            <Link
              href={`/admin-dashboard/employee/designation-update/${row.sl}/`}
              passHref
            >
              <Typography
                variant="span"
                title="Delete Designation"
                component="span"
                sx={{
                  background: "#FA3D06",
                  fontSize: "17px",
                  borderRadius: "3px",
                  padding: "5px",
                  color: "#fff",
                }}
              >
                <Tooltip title="Edit Designation">
                  <IconButton sx={{ color: "#fff" }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Link>
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
        Designation
      </Typography>
      <Divider />

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3 }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <Grid container>
            <Grid item sm={12} md={8}>
              <Typography
                variant="h4"
                component="div"
                sx={{ display: "flex", pt: 2 }}
              >
                <CopyToClipboard onCopy={onCopyText} text={data}>
                  <Button
                    sx={{ background: "#BFC6CD", marginRight: "3px" }}
                    variant="contained"
                  >
                    Copy
                  </Button>
                </CopyToClipboard>

                <Button
                  sx={{ background: "#2AB9D0", marginRight: "3px" }}
                  variant="contained"
                >
                  {" "}
                  <CSVLink {...csvReport}>CSV</CSVLink>{" "}
                </Button>
                {/* <Button onClick={(e) => exportToCSV(rows, 'fileName')} sx={{ background: '#2AB9D0', marginRight: '3px' }} variant='contained'>CSV</Button> */}
                <Button
                  onClick={(e) => exportToCSV(rows, "EhsanMarketting")}
                  sx={{ background: "#59BF70", marginRight: "3px" }}
                  variant="contained"
                >
                  Excel
                </Button>
                <Button
                  onClick={printDocument}
                  sx={{ background: "#E91E63", marginRight: "3px" }}
                  variant="contained"
                >
                  PDF
                </Button>

                <ReactToPrint
                  trigger={() => (
                    <Button
                      sx={{ background: "#6563EF", marginRight: "3px" }}
                      variant="contained"
                    >
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                ></ReactToPrint>
              </Typography>
            </Grid>
            <Grid item md={4}>
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
                <Link href="/admin-dashboard/employee/create-designation/">
                  Add Designation
                </Link>
              </Typography>
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
          <TableContainer
            id="pdfdiv"
            style={{ marginTop: "0px", background: "white" }}
          >
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
              <TableBody ref={componentRef}>
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
  );
};
export default withAdminAuth(AddLogo);

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

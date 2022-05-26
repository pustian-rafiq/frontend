import React, { useEffect, useState } from "react";
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
import { Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useVatGstList, {
  GET_VAT_GST_LIST,
} from "../../../apolloClient/queries/vatGst/vatGstListQuery";
import getCookie from "../../../utils/getCookie";
import client from "../../../apolloClient/configuration/apolloConfig";
import useDeleteVat from "../../../apolloClient/mutation/vatGst/deleteVat";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";
import swal from "sweetalert";

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
    label: "SL.",
  },

  {
    id: "sector",
    numeric: false,
    disablePadding: false,
    label: "Sector VAT/GST",
  },
  {
    id: "percentage",
    numeric: false,
    disablePadding: false,
    label: "Percentage(%)",
  },
  {
    id: "country",
    numeric: false,
    disablePadding: false,
    label: "Country",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "State",
  },
  {
    id: "county",
    numeric: false,
    disablePadding: false,
    label: "County",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
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
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const VatList = ({ token, currentUser }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    previousData: previousVatGsts,
    data: vatGsts,
    loading: vatListLoading,
    refetch: vatsRefetch,
    fetchMore: vatFetchMore,
  } = useQuery(GET_VAT_GST_LIST, {
    variables: { first: rowsPerPage + 1 },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const {
    vatDelete,
    loading: vatDeleteLoading,
    error: vatDeleteError,
  } = useDeleteVat();

  const handleVatDelete = (id) => {
    swal("Are you sure?", {
      buttons: {
        cancel: "Cancel",
        delete: true,
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          vatDelete({
            variables: {
              id: id,
            },
            context: {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
            onCompleted: () => {
              swal("Vat Deleted!");
            },
            onError: (err) => {
              swal(err);
            },
          });
          break;
        case "cancel":
          break;

        default:
          break;
      }
    });
  };

  if (vatListLoading) {
    return <p>Loading...</p>;
  }

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
    const length = (vatGsts?.vats?.edges).length;
    const pageData = newPage * rowsPerPage;
    if (newPage && pageData === length - 1) {
      vatFetchMore({
        variables: {
          after: vatGsts.vats.pageInfo.endCursor,
          first: rowsPerPage,
        },
      });
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - vatGsts?.vats?.edges.length)
      : 0;

  //Show bank data and searches real time
  const tableDatas = vatGsts?.vats?.edges.filter((search) => {
    return (
      search?.node?.country?.name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      search?.node?.county?.toLowerCase().includes(searchText.toLowerCase()) ||
      search?.node?.state?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((vatGst, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={vatGst.node.id}
          style={{ background: "rgb(247, 247, 247)" }}
          className="rowHover"
        >
          <TableCell
            className="tableBorder"
            id={labelId}
            component="th"
            scope="row"
          >
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.sector}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.percentageAmt}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.country?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.state}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.county}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.city}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {vatGst.node.description}
          </TableCell>
          <TableCell className="tableBorder " align="left">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                border: 0,
              }}
            >
              <Link
                href={`/admin-dashboard/vat-gst/vat-update/${vatGst.node.id}/`}
                passHref
              >
                {/* <Typography
                variant="span"
                component="span"
                sx={{
                  cursor: "pointer",
                  background: "#FF990D",
                  borderRadius: "3px",
                  padding: "10px 3px",
                }}
              > */}
                <Tooltip title="Update Vat">
                  <IconButton color="warning">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
                </Tooltip>
                {/* </Typography> */}
              </Link>
              <Tooltip title="Delete Vat">
                <IconButton
                  color="error"
                  onClick={() => handleVatDelete(vatGst.node.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </Tooltip>
            </Box>
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
        VAT/GIST LIST
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
            <Link href="/admin-dashboard/vat-gst/create-vat/">Add Vat/Gst</Link>
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
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={vatGsts?.vats?.edges.length}
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

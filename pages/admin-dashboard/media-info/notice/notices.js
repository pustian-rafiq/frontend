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
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import { useQuery } from "@apollo/client";
import swal from "sweetalert";
import { GET_SLIDER_NOTICE } from "../../../../apolloClient/queries/sliderNotice/sliderNotice";
import useDeleteSliderNotice from "../../../../apolloClient/mutation/noticeSlider/deleteSliderNotice"
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
    label: "Serial",
  },

  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },


  {
    id: "active",
    numeric: false,
    disablePadding: false,
    label: "Active",
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
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const NoticeAll = ({ token, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, loading, error } = useQuery(GET_SLIDER_NOTICE, {
    fetchPolicy: "cache-and-network",
  });


  const { deleteSliderNotice } = useDeleteSliderNotice();

  if (loading) {
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
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteSlider = (id) => {
    swal("Are you sure?", {
      buttons: {
        cancel: "Cancel",
        delete: true,
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          deleteSliderNotice({
            variables: {
              id: id,
            },
            context: {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
            onCompleted: () => {
              swal("Slider Deleted!");
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data?.sliderNotifications?.edges?.length)
      : 0;

  //Show bank data and searches real time
  const tableDatas = data?.sliderNotifications?.edges?.filter((search) => {
    return search.node.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.node.id}
          style={{ background: "rgb(247, 247, 247)" }}
          className="rowHover"
        >
          <TableCell
            className="tableBorder"
            id={labelId}
            component="th"
            scope="row"
          >
            {index + 1}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.title}
          </TableCell>
       
          <TableCell className="tableBorder" align="left">
            {row?.node?.isActive ? "Yes" : "No"}
          </TableCell>
          <TableCell
            className="tableBorder "
            align="left"
            style={{ width: "15%" }}
          >
            <Link
              href={`/admin-dashboard/media-info/notice/${row?.node?.id}/`}
              passHref
            >
              <Tooltip title="Update Notice">
                <IconButton sx={{ color: "#0DA8EE", fontSize: "20px" }}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Delete Slider Notice">
              <IconButton
                onClick={() => handleDeleteSlider(row?.node?.id)}
                sx={{ color: "#FA3D06", fontSize: "20px" }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Tooltip>
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
        Notice Slider
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
              width: "130px",
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
            <Link href="/admin-dashboard/media-info/notice/add-notice">
              Add Notice
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
            count={data?.sliderNotifications?.edges?.length}
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
export default withAdminAuth(NoticeAll);

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

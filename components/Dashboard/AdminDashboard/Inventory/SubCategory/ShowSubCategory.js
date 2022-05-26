import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

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
import { IconButton, Tooltip, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import {GET_SUBCATEGORIES} from "../../../../../apolloClient/queries/inventory/SubCategoryQuery";
import useDeleteSubCategory from "../../../../../apolloClient/mutation/inventory/DeleteSubCategory";
import { useRouter } from "next/router";

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
    id: "subcategory",
    numeric: true,
    disablePadding: false,
    label: "Sub Category Name",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "image",
    numeric: true,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "action",
    numeric: true,
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

const ShowCategory = ({ subCategories, getSessionCookie }) => {
  const router = useRouter();

  const [searchText, setSearchText] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sl");
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Category Delete Handler
  const { subCategoryDeleteMutation, loading, error, reset } =
    useDeleteSubCategory();

  const subCategoryDeleteHandler = (id) => {
    swal({
      title: "Are you sure to Delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      className: "swal-wide",
      style: { height: "20px" },
    }).then((willDelete) => {
      if (willDelete) {
        subCategoryDeleteMutation({
          variables: {
            id: id,
          },
          context: {
            headers: {
              Authorization: `JWT ${getSessionCookie}`,
            },
          },
          refetchQueries: [{ query: GET_SUBCATEGORIES }],
          onCompleted: () => {
            console.log("on completed");
            router.push("/admin-dashboard/inventory/subCategory");
          },
        });
        reset();
        swal("Hey! Sub-Category has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Sub-Category is safe!");
      }
    });
  };

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

  //Show bank data and searches real time
  const tableDatas = subCategories.filter((search) => {
    return (
      search?.node?.name.toLowerCase().includes(searchText.toLowerCase()) ||
      search?.node?.category?.name.toLowerCase().includes(searchText.toLowerCase())
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
          className="rowHover"
        >
          <TableCell className="tableBorder" align="left">
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.node?.category?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
           <img src={row?.node?.image} width={50} height={50} />
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ width: "130px" }}
          >
            <Link
              href={`/admin-dashboard/inventory/edit-subcategory/${row?.node?.id}/`}
              passHref
            >
              <Tooltip title="Update Sub-Category">
                <IconButton color="warning">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Delete Sub-Category">
              <IconButton
                onClick={() => subCategoryDeleteHandler(row.node.id)}
                color="warning"
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
      <Paper
        sx={{ width: "100%", mb: 2, mt: 3 }}
        style={{ paddingRight: "10px", paddingLeft: "10px" }}
      >
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
            // sx={{ minWidth: 750 }}
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
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={tableDatas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ShowCategory;

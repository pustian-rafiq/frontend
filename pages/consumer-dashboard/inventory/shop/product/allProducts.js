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
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import useCurrentUserProducts from "../../../../../apolloClient/queries/products/currentUserProducts";
import useDeleteProduct from "../../../../../apolloClient/mutation/product/deleteProduct";

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Serial",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "warehouse",
    numeric: false,
    disablePadding: false,
    label: "Warehouse",
  },
  {
    id: "buy_price",
    numeric: false,
    disablePadding: false,
    label: "Buy Price",
  },
  {
    id: "sell_price",
    numeric: false,
    disablePadding: false,
    label: "Sell Price",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
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
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const allProducts = ({ token, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, loading, error, fetchMore } = useCurrentUserProducts(
    token,
    rowsPerPage
  );

  // console.log('all products in dashboard::',data);
  const { productDelete } = useDeleteProduct();

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
    const length = (data?.myProducts?.edges).length;
    const pageData = newPage * rowsPerPage;
    if (newPage && pageData === length - 1) {
      fetchMore({
        variables: {
          after: data?.myProducts?.pageInfo?.endCursor,
          first: rowsPerPage,
        },
      });
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteProduct = (id) => {
    swal("Are you sure?", {
      buttons: {
        cancel: "Cancel",
        delete: true,
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          productDelete({
            variables: {
              id: id,
            },
            context: {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
            onCompleted: () => {
              swal("Product Deleted!");
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

  //Show bank data and searches real time
  const tableDatas = data?.myProducts?.edges?.filter((search) => {
    return (
      search.node.name.toLowerCase().includes(searchText.toLowerCase()) ||
      search.node?.company?.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  });

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row?.node?.id}
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
            {row?.node?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.company?.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.buyPrice}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.sellPrice}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.quantity}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            <img
              src={
                row?.node?.productImage
                  ? row?.node?.productImage
                  : "/images/spinner.gif"
              }
              width="60"
              height="60"
            />
          </TableCell>
          <TableCell
            className="tableBorder "
            align="left"
            style={{ width: "15%" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                href={`/consumer-dashboard/inventory/shop/product/update/${row.node.id}`}
                passHref
              >
                <Tooltip title="Update Product">
                  <IconButton sx={{ color: "#0DA8EE", fontSize: "24px" }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link
                href={`/consumer-dashboard/inventory/shop/product/addProductVideo/${row.node.id}`}
                passHref
              >
                <Tooltip title="Add/Update Video">
                  <IconButton sx={{ color: "#0DA8EE", fontSize: "24px" }}>
                    <FontAwesomeIcon icon={faVideo} />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete Product">
                <IconButton
                  onClick={() => handleDeleteProduct(row.node.id)}
                  sx={{ color: "#FA3D06", fontSize: "24px" }}
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
        All Products
      </Typography>
      <Divider />

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, textAlign: "center" }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
            <Link href="/consumer-dashboard/inventory/shop/product/addProduct">
              <Button variant="contained" sx={{ textTransform: "none" }}>
                <Add />
                Add Product
              </Button>
            </Link>
          </Box>

          <Box sx={{ my: "10px" }} className="searchSection">
            <Box className="searchInput">
              <input
                type="text"
                placeholder="Search for name, warehouse..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <ClearIcon className="clearIcon" onClick={searchTextHandler} />
            </Box>
          </Box>
          {!loading ? (
            <Box>
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
                    rowCount={tableDatas?.length}
                  />
                  <TableBody>
                    {/* Show tbale bodt data */}
                    {tableData}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={data?.myProducts?.edges?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          ) : (
            <Typography component="div">
              <img src="/images/loading.gif" />
            </Typography>
          )}
        </Paper>
      </Box>
    </div>
  );
};
export default withConsumerAuth(allProducts);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  if (getSessionCookie === null || !getUser || getUser.isStaff) {
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

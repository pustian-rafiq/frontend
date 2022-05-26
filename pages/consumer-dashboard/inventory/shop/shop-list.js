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
import {
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreviewIcon from "@mui/icons-material/Preview";
import Add from "@mui/icons-material/Add";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import { GET_SHOP_LIST } from "../../../../apolloClient/queries/ConsumerDashboard/shop/ShopQuery";
import getCurrentUser from "../../../../utils/getCurrentUser";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";

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
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "logo",
    numeric: true,
    disablePadding: false,
    label: "Logo",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
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
            style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
            className="tableBorder"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
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
  // rowCount: PropTypes.number.isRequired,
};

const ShopList = ({ token }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_SHOP_LIST, {
    variables: { before: null, last: 11 },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  console.log("data", data);

  const [searchText, setSearchText] = React.useState("");
  const [searchWarehouse, setSearchWarehouse] = React.useState("");

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sl");
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
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

  // // Fetch more data when click next button
  // const dataLoadHandler = (page) => {
  //   const { startCursor } = data?.me?.consumers?.shops?.pageInfo;
  //   fetchMore({
  //     variables: { before: startCursor, first: page },
  //     updateQuery: (prevResult, { fetchMoreResult }) => {
  //       fetchMoreResult.me?.consumers?.shops?.edges = [
  //         ...prevResult.me?.consumers?.shops.edges,
  //         ...fetchMoreResult.me?.consumers?.shops.edges
  //       ];
  //       return fetchMoreResult;
  //     }
  //   });

  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(rowsPerPage, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box>
        <Image src="/images/loading9.svg" layout="fill" />
      </Box>
    );
  }
  if (error) {
    return <div>Something went wrong....</div>;
  }
  //Show shop data and searches real time
  const tableDatas = data?.me?.consumers?.shops?.edges.filter((search) => {
    return search?.node?.name.toLowerCase().includes(searchText.toLowerCase());
    // search?.node?.phone.toLowerCase().includes(searchText.toLowerCase()) ||
    // search?.node?.email.toLowerCase().includes(searchText.toLowerCase())
  });
  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;

      return (
        <TableRow hover={true} tabIndex={-1} key={index} className="rowHover">
          <TableCell
            component="th"
            id={labelId}
            scope="row"
            padding="none"
            className="tableBorder"
            align="center"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {" "}
            {row.node.name}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ width: "70px", height: "70px" }}
          >
            <img
              src={row.node.logo ? row.node.logo : "/images/logo.png"}
              width="70"
              height="70"
            />
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.email}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.phone}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ width: "70px", height: "70px" }}
          >
            {/* <img src="/images/consumer/rafiq.jpg" width="70" height="70" /> */}
            <img
              src={
                row.node.shopImage
                  ? row.node.shopImage
                  : "/images/wearhouse.jpeg"
              }
              width="70"
              height="70"
            />
          </TableCell>

          <TableCell className="tableBorder">
            <Typography sx={{ display: "flex" }}>
              <Link
                href={{
                  pathname: `/shop/${row.node.slug}`,
                  query: {
                    id: `${row.node.id}`,
                  },
                }}
                as={`/shop/${row.node.slug}`}
                passHref
              >
                <Tooltip title="Shop Details">
                  <IconButton color="success">
                    <PreviewIcon sx={{ fontSize: "29px" }} />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link
                href={`/consumer-dashboard/inventory/shop/update/${row.node.id}`}
                passHref
              >
                <Tooltip title="Update Shop">
                  <IconButton color="warning" sx={{ fontSize: "25px" }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </Tooltip>
              </Link>

              <Tooltip title="Update Shop">
                <IconButton color="warning" sx={{ fontSize: "25px" }}>
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </Tooltip>
            </Typography>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "18px", md: "25px", lg: "30px" },
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
        }}
      >
        Shop List
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 1 }}
          style={{ paddingRight: "10px", paddingLeft: "10px" }}
        >
          <Button
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              my: 1,
              textTransform: "capitalize",
            }}
            variant="contained"
            startIcon={<Add />}
          >
            <Link href="/consumer-dashboard/inventory/shop/add-shop/">
              Add New
            </Link>
          </Button>
          <Box sx={{ my: "10px" }} className="searchSection">
            <Typography className="searchLabel">Search</Typography>
            <Box className="searchInput">
              <input
                type="text"
                placeholder="Search for name, address and others.."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <ClearIcon className="clearIcon" onClick={searchTextHandler} />
            </Box>
          </Box>
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
                //rowCount={tableDatas.length}
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
            count={data?.me?.consumers?.shops?.edges.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default withConsumerAuth(ShopList);

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

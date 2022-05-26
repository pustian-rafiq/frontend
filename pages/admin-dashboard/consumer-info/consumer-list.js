import React, { useState } from "react";
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
import {   Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';

import getCookie from "../../../utils/getCookie";
import { GET_CONSUMERS } from '../../../apolloClient/queries/consumer/allConsumerQuery'
import { useQuery } from "@apollo/client";
import useSearchConsumers from "../../../apolloClient/queries/consumer/searchConsumerQuery";
import { useRouter } from "next/router";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreviewIcon from '@mui/icons-material/Preview';
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";

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
    id: "consumer_name",
    numeric: true,
    disablePadding: false,
    label: "Consumer Name",
  },
  {
    id: "consumer_id",
    numeric: true,
    disablePadding: false,
    label: "Consumer CIN",
  },
  {
    id: "consumer_phone",
    numeric: true,
    disablePadding: false,
    label: "Consumer Phone",
  },

  {
    id: "consumer_email",
    numeric: true,
    disablePadding: false,
    label: "Consumer Email",
  },
  {
    id: "refer_byid",
    numeric: true,
    disablePadding: false,
    label: "Refered By ID",
  },
  {
    id: "reference1_id",
    numeric: true,
    disablePadding: false,
    label: "Reference1 ID",
  },
  {
    id: "reference2_id",
    numeric: true,
    disablePadding: false,
    label: "Reference2 ID",
  },
  {
    id: "password",
    numeric: true,
    disablePadding: false,
    label: "Password",
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
  rowCount: PropTypes.number.isRequired,
};

const ConsumerList = ({ token, currentUser }) => {


  const { data, error, loading, fetchMore } = useQuery(GET_CONSUMERS, {
    variables: { before: null, last: 16 },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  const [searchText, setSearchText] = useState("");
  const [searchConsumer, setSearchConsumer] = useState([]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("sl");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const searchTextHandler = (e) => {
    setSearchText(e.target.value)
    const search = e.target.value;
    if (!search) {
      setSearchConsumer("")
    }
  };
  const searchClearHandler = (e) => {
    setSearchText("");
    setSearchConsumer("")
  };
  // Fetch more data when click next button
  const dataLoadHandler = (page) => {
    const { startCursor } = data?.allConsumerNode?.pageInfo;
    fetchMore({
      variables: { before: startCursor, last: page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.allConsumerNode?.edges = [
          ...prevResult.allConsumerNode.edges,
          ...fetchMoreResult.allConsumerNode.edges
        ];
        return fetchMoreResult;
      }
    });

  };

  const handleChangePage = (event, newPage) => {

    const length = (data?.allConsumerNode?.edges).length;
    const pageData = (newPage) * 15;
    setPage(newPage);
    if (newPage && (pageData === length - 1)) {
      dataLoadHandler(15)
    }
  };

  const handleChangeRowsPerPage = (event) => {

    const length = (data?.allConsumerNode?.edges).length;
    const rowPerPage = event.target.value;
    if (length > rowPerPage) {
      setRowsPerPage(parseInt(rowPerPage, 10));
      setPage(0);
    }
  };

  // Consumer Search handler
  const searchConsumerHandler = async () => {
    const searchData = useSearchConsumers(searchText)
    await searchData.then((res) => {
      setSearchConsumer(res?.data?.searchConsumer?.edges)
      setPage(0);
    }).catch((err) => {
      console.log(err)
    })
  }

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Something went wrong....</div>;
  }

  // Show Consumer Data
  const tableData = stableSort(searchConsumer?.length > 0 ? searchConsumer : data?.allConsumerNode?.edges, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={index}
          style={{ background: "rgb(247, 247, 247)" }}
          className="rowHover"
        //onDoubleClick={() => consumerDetailsHandler(row.node.id)}
        >
          <TableCell component="th" scope="row" className="tableBorder">
            {" "}
            {(page * rowsPerPage) + (++index)}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.user.firstName} {row.node.user.lastName}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.username}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.callingCode}{row.node.phone}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.user.email}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.referedBy}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.leftRefer}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.rightRefer}
          </TableCell>
          <TableCell
            className="tableBorder"
            align="left"
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
          >
            {row.node.password}
          </TableCell>
          <TableCell
            className="tableBorder"
           
          >
            <Typography component={"div"} sx={{display:'flex'}}>
             
              <Link href={`/admin-dashboard/consumer-info/details/${row.node.id}`} passHref  >
                <a target="_blank">
                <Tooltip title="Details Consumer" >
                  <IconButton color="success">
                    {/* <FontAwesomeIcon icon={faEye} /> */}
                    <PreviewIcon  sx={{fontSize:'29px'}} />
                  </IconButton>
                </Tooltip>
                </a>
              
              </Link>
              <Link href={`/admin-dashboard/consumer-info/edit/${row.node.id}`} passHref>
                <Tooltip title="Update Consumer">
                  <IconButton color="warning" sx={{fontSize:'25px'}}>
                    <FontAwesomeIcon icon={faEdit} /> 
                   
                  </IconButton>
                </Tooltip>
              </Link>
            </Typography>

            {/* <Link href={`/admin-dashboard/consumer-info/edit/${row.node.id}`} passHref>
              <Button className="selectButton ">Edit</Button>
            </Link> */}
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
          mb: 2,
        }}
      >
        All Consumer List
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3 }}
          style={{ paddingRight: "10px", paddingLeft: "10px" }}
        >
          <Typography component={"div"} style={{ marginTop: "10px" }} className="searchSection">
            <Typography className="searchInput">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search for first name, last name, cin or phone without country code...."
                onChange={searchTextHandler}
                value={searchText}
              />
              <ClearIcon className="clearIcon" onClick={searchClearHandler} />
            </Typography>
            <Typography onClick={searchConsumerHandler} sx={{ cursor: 'pointer', marginRight: '5px', marginLeft: '5px' }} className="searchLabel">Search</Typography>
            {/* <Typography onClick={searchTextHandler} sx={{ cursor: 'pointer' }} className="searchLabel">Clear</Typography> */}
          </Typography>
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
                rowCount={data?.allConsumerNode?.edges?.length}
              />
              <TableBody>
                {/* Show tbale bodt data */}
                {tableData}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[15, 50, 100, 300]}
            component="div"
            count={searchConsumer?.length > 0 ? searchConsumer?.length : data?.allConsumerNode?.edges?.length}
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
export default withAdminAuth(ConsumerList);

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

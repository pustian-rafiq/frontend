import React from 'react'
import withConsumerAuth from '../../../../components/Dashboard/PrivateRoute/withConsumerAuth'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Button, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreviewIcon from '@mui/icons-material/Preview';
import { GET_WEARHOUSE_LIST } from '../../../../apolloClient/queries/ConsumerDashboard/wearhouse/WearhouseQuery';
import getCookie from '../../../../utils/getCookie';
import SearchIcon from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import getCurrentUser from '../../../../utils/getCurrentUser';

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array=[], comparator) {
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
    id: 'sl',
    numeric: false,
    disablePadding: true,
    label: 'SL.',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead  >
      <TableRow >

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'left'}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
            className="tableBorder"
            sx={{ fontSize: { xs: '12px', md: '15px' } }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
};

const WarehouseList = ({ token }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_WEARHOUSE_LIST, {
    variables: { before: null, last: 21 },
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });
  // const { data, loading,error,fetchMore } = useVatGst(vatId);

 // console.log("masterUsers", data?.allMasterConsumer?.edges)
  //console.log("masterUsers",masterUsers)

  const [searchText, setSearchText] = React.useState("");
  const [searchWarehouse, setSearchWarehouse] = React.useState("");

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('sl');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const searchTextHandler = (e) => {
    setSearchText(e.target.value)
    const search = e.target.value;
    if (!search) {
      setSearchWarehouse("")
    }
  };
  const searchClearHandler = (e) => {

    setSearchText("");
  };

  // Search consumer handler
  const searchWarehouseHandler = async () => {
    // // console.log("Search....")
    // const searchData = useSearchConsumers(searchText)
    // await searchData.then((res) => {
    //   setSearchConsumer(res?.data?.searchConsumer?.edges)
    // }).catch((err) => {
    //   console.log(err)
    // })

    // console.log("searchData", searchConsumer)
  }




  const handleChangePage = (event, newPage) => {
    const length = (data?.me?.consumers?.warehouses?.edges).length;
    const pageData = (newPage) * 10;
    setPage(newPage);
    if (newPage && (pageData === length - 1)) {
      dataLoadHandler(20)
    }
  };

  // Fetch more data when click next button
  const dataLoadHandler = (page) => {
    const { startCursor } = data?.me?.consumers?.warehouses?.pageInfo;
    fetchMore({
      variables: { before: startCursor, first: page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.me?.consumers?.warehouses?.edges = [
          ...prevResult.me?.consumers?.warehouses?.edges,
          ...fetchMoreResult.me?.consumers?.warehouses?.edges
        ];
        return fetchMoreResult;
      }
    });

  };


  const handleChangeRowsPerPage = (event) => {

    //loadHandler(event.target.value)
    const length = (data?.me?.consumers?.warehouses?.edges).length;
    const rowPerPage = event.target.value;
    if (length > rowPerPage) {
      setRowsPerPage(parseInt(rowPerPage, 10));
      setPage(0);
    }

  };


  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Something went wrong....</div>;
  }
    //Show warehouse data and searches real time
    const tableDatas = data?.me?.consumers?.warehouses?.edges.filter((search) => {
      return (
          search.node.name.toLowerCase().includes(searchText.toLowerCase()) ||
          search.node.description.toLowerCase().includes(searchText.toLowerCase())
      );
    })
  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`

      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.node.id}
          className="rowHover"
        >
          <TableCell
            component="th"
            id={labelId}
            scope="row"
            padding="none"
            className="tableBorder"
            align="center"
            sx={{ fontSize: { xs: '12px', md: '15px' } }}
          >
            {(page * rowsPerPage) + (++index)}
          </TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>  {row.node.name}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>{row.node.description}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ width: '70px', height: '70px' }}>
            {/* <img src="/images/consumer/rafiq.jpg" width="70" height="70" /> */}
            <img src={row.node.image ? row.node.image : "/images/wearhouse.jpeg" } width="70" height="70" />

          </TableCell>

          <TableCell
            className="tableBorder"
          >
            <Typography sx={{ display: 'flex' }}>

              <Link href={`/consumer-dashboard/inventory/warehouse/details/${row.node.id}`} passHref  >
                  <Tooltip title="Details Warehouse" >
                    <IconButton color="success">
                      {/* <FontAwesomeIcon icon={faEye} /> */}
                      <PreviewIcon sx={{ fontSize: '29px' }} />
                    </IconButton>
                  </Tooltip>
              </Link>

              <Link href={`/consumer-dashboard/inventory/warehouse/update/${row.node.id}`} passHref>
                <Tooltip title="Update Warehouse">
                  <IconButton color="warning" sx={{ fontSize: '25px' }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Typography>
          </TableCell>
        </TableRow>
      );
    })
  return (
    <>
      <Typography sx={{
        fontSize: { xs: '18px', md: '25px', lg: '30px' },
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6C757D',
      }} >
       Warehouse List
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Box sx={{ width: '100%' }} style={{ paddingRight: '5px' }} >
        <Paper sx={{ width: '100%', mb: 2, mt: 3 , px: 2}}>
          <Button sx={{mt:2,fontSize:{xs:'12px',sm:'14px',md:'16px'} ,textTransform:'capitalize'}} variant="contained" startIcon={<Add />}>
            <Link href="/consumer-dashboard/inventory/warehouse/add-warehouse/">
              Add New
            </Link>
          </Button>
          <Box sx={{my:1}} className="searchSection">
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
            {/* <Typography onClick={searchWarehouseHandler} sx={{ cursor: 'pointer', marginRight: '5px', marginLeft: '5px' }} className="searchLabel">Search</Typography> */}
            {/* <Typography onClick={searchTextHandler} sx={{ cursor: 'pointer' }} className="searchLabel">Clear</Typography> */}
          </Box>
          <TableContainer style={{ marginTop: '0px', background: 'white' }} >
            <Table
              // sx={{ minWidth: 750 }}
              sx={{
                minWidth: 750
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
              <TableBody >
                {/* Show tbale bodt data */}
                {tableData}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[20, 30, 50, 100]}
            component="div"
            count={data?.me?.consumers?.warehouses?.edges.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  )
}


export default withConsumerAuth(WarehouseList)

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
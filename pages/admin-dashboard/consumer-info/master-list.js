import React,{useState} from 'react'
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
import getCookie from '../../../utils/getCookie';
import { GET_MASTER_CONSUMERS } from '../../../apolloClient/queries/consumer/allMasterUserQuery';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreviewIcon from '@mui/icons-material/Preview';
import getCurrentUser from '../../../utils/getCurrentUser';
import withAdminAuth from '../../../components/Dashboard/PrivateRoute/withAdminAuth';
import Add from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import useSearchMasterConsumers from '../../../apolloClient/queries/consumer/searchMasterConsumer';

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
function stableSort(array, comparator) {
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
    id: 'sl',
    numeric: false,
    disablePadding: true,
    label: 'SL.',
  },
  {
    id: 'photo',
    numeric: true,
    disablePadding: false,
    label: "Photo",
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'cin',
    numeric: true,
    disablePadding: false,
    label: 'CIN',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'reference1',
    numeric: true,
    disablePadding: false,
    label: 'Reference1',
  },
  {
    id: 'reference2',
    numeric: true,
    disablePadding: false,
    label: 'Reference2',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
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

const MasterConsumerList = ({ token , currentUser}) => {
  const { data, error, loading, fetchMore } = useQuery(GET_MASTER_CONSUMERS, {
    variables: { before: null, last: 26 },
    //fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });
console.log("token",data)
  const [searchText, setSearchText] = useState("");
  const [searchMasterConsumer, setSearchMasterConsumer] = useState([]);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('sl');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const searchTextHandler = (e) => {
    setSearchText(e.target.value)
    const search = e.target.value;
    if (!search) {
      setSearchMasterConsumer("")
    }
  };
  const searchClearHandler = (e) => {
    setSearchText("");
    setSearchMasterConsumer("")
  };

  const handleChangePage = (event, newPage) => {
    const length = (data?.allMasterConsumer?.edges).length;
    const pageData = (newPage) * 25;
    setPage(newPage);
    if(newPage && (pageData === length-1)){
      dataLoadHandler(25)
    } 
  };

  // Fetch more data when click next button
  const dataLoadHandler = (page) => {
    const { startCursor } = data?.allMasterConsumer?.pageInfo;
    fetchMore({
      variables: {  before: startCursor, last: page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.allMasterConsumer?.edges = [
          ...prevResult.allMasterConsumer.edges,
          ...fetchMoreResult.allMasterConsumer.edges
        ];
        return fetchMoreResult;
      }
    });

  };

  const handleChangeRowsPerPage = (event) => {
    const length = (data?.allMasterConsumer?.edges).length;
    const rowPerPage = event.target.value;
    if (length > rowPerPage) {
      setRowsPerPage(parseInt(rowPerPage, 10));
      setPage(0);
    }

  };

// Master Consumer Search handler
const searchMasterConsumerHandler = async () => {
  const searchData = useSearchMasterConsumers(searchText,token)
  await searchData.then((res) => {
    setSearchMasterConsumer(res?.data?.searchMasterConsumer?.edges)
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
  //Show bank data and searches real time
 
  const tableData = stableSort(searchMasterConsumer?.length > 0 ? searchMasterConsumer : data?.allMasterConsumer?.edges, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={index}
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
          <TableCell className="tableBorder" align="left" sx={{ width: '70px', height: '70px' }}>
            {/* <img src="/images/consumer/rafiq.jpg" width="70" height="70" /> */}
            <img src={row?.node?.photo} width={70} height={70} />
          </TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>  {row.node.user.firstName} {row.node.user.lastName}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>{row.node.username}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>{row.node.phone}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' }, wordWrap:'break-word' }} >{row.node.user.email}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>{row.node.consumerreftree.ref1Count}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>{row.node.consumerreftree.ref2Count}</TableCell>
          <TableCell className="tableBorder" align="left" sx={{ fontSize: { xs: '12px', md: '15px' } }}>{row.node.consumerreftree.ref1Count + row.node.consumerreftree.ref2Count}</TableCell>
          <TableCell
            className="tableBorder"
          >
            <Typography sx={{display:'flex'}}>
             
              <Link href={`/admin-dashboard/consumer-info/details/${row.node.id}`} passHref  >
                <a target="_blank">
                <Tooltip title="Details Master" >
                  <IconButton color="success">
                    {/* <FontAwesomeIcon icon={faEye} /> */}
                    <PreviewIcon  sx={{fontSize:'29px'}} />
                  </IconButton>
                </Tooltip>
                </a>
              
              </Link>
              <Link href={`/admin-dashboard/consumer-info/edit/${row.node.id}`} passHref>
                <Tooltip title="Update Master">
                  <IconButton color="warning" sx={{fontSize:'25px'}}>
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
        Master Consumer List
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ width: '100%' }} style={{ paddingRight: '5px' }} >
        <Paper sx={{ width: '100%', mb: 2, mt: 3 }} style={{ paddingRight: '10px', paddingLeft: '10px' }} >
        <Button sx={{fontSize:{xs:'12px',sm:'14px',md:'16px'},mt:1,textTransform:'capitalize',background:'#45B9E0',":hover":{background:'#3a9cbc'}}} variant="contained" startIcon={<Add />}>
            <Link href="/admin-dashboard/consumer-info/register-master/">
              Add New
            </Link>
          </Button>
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
            <Typography onClick={searchMasterConsumerHandler} sx={{ cursor: 'pointer', marginRight: '5px', marginLeft: '5px' }} className="searchLabel">Search</Typography>
          </Typography>
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
            rowsPerPageOptions={[25, 50, 100, 300]}
            component="div"
            count={searchMasterConsumer?.length > 0 ? searchMasterConsumer.length : data?.allMasterConsumer?.edges.length}
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

export default withAdminAuth(MasterConsumerList)

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
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
import { Divider, Grid, Typography } from "@mui/material";
import withConsumerAuth from "../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from "@apollo/client";
import { GET_REF2_FOREIGN_CONSUMERS } from "../../../apolloClient/queries/ConsumerDashboard/ConsumerInfo/Ref2Foreign";
import useSearchRef2ForeignConsumers from "../../../apolloClient/queries/consumer/ref2ForeignSearch";


function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          SL No.
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          {" "}
          CIN
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          Name
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          Country
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const Reference1 = ({token}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchText, setSearchText] = useState("");
  const [searchRef2ForeignConsumer, setSearchRef2ForeignConsumer] = useState([]);


  // Fetch reference-1 consumers
  const { data, error, loading, fetchMore } = useQuery(GET_REF2_FOREIGN_CONSUMERS, {
    variables: { before: null, last: 16 },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  //console.log("Data", data)
  //Search text handler
  const searchTextHandler = (e) => {
    setSearchText(e.target.value)
    const search = e.target.value;
    if (!search) {
      setSearchRef2ForeignConsumer("")
    }
  };
  const searchClearHandler = (e) => {
    setSearchText("");
    setSearchRef2ForeignConsumer("")
  };


  const handleChangePage = (event, newPage) => {
    const length = (data?.me?.consumers?.consumerreftree?.ref2Foreign?.edges).length;
    const pageData = (newPage) * 15;
    setPage(newPage);
    if (newPage && (pageData === length - 1)) {
      dataLoadHandler(15)
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const length = (data?.me?.consumers?.consumerreftree?.ref2Foreign?.edges).length;
    const rowPerPage = event.target.value;
    if (length > rowPerPage) {
      setRowsPerPage(parseInt(rowPerPage, 10));
      setPage(0);
    }
  };
  // Fetch more data when click next button
  const dataLoadHandler = (page) => {
    const { startCursor } = data?.me?.consumers?.consumerreftree?.ref2Foreign?.pageInfo;
    fetchMore({
      variables: { before: startCursor, last: page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult?.me?.consumers?.consumerreftree?.ref2Foreign?.edges = [
          ...prevResult?.me?.consumers?.consumerreftree?.ref2Foreign?.edges,
          ...fetchMoreResult?.me?.consumers?.consumerreftree?.ref2Foreign?.edges
        ];
        return fetchMoreResult;
      }
    });

  };

  // Search consumer handler
   const searchConsumerHandler = async () => {

   const searchData = useSearchRef2ForeignConsumers(searchText,token)
    await searchData.then((res) => {
      setSearchRef2ForeignConsumer(res?.data?.searchRef2Consumers?.edges)
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



  //Show transaction history data
  const tableData =  ( searchRef2ForeignConsumer?.length > 0 ? searchRef2ForeignConsumer : data?.me?.consumers?.consumerreftree?.ref2Foreign?.edges)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          className="rowHover"
          tabIndex={-1}
          key={index}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">{(page * rowsPerPage) + (++index)}</TableCell>
          <TableCell className="tableBorder" align="left">
          {row.node.username}
          </TableCell>
          <TableCell className="tableBorder" align="left">
          {row.node.user.firstName} {row.node.user.lastName}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.node.country.name}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <Box>
      <Typography sx={{
        fontSize: { xs: '18px', md: '25px', lg: '30px' },
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6C757D',
      }} >
        Reference-2 Foreign Consumers List
      </Typography>
      <Divider sx={{ mb: 2,mt:2 }} />

        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper
                sx={{ width: "100%", mb: 2, mt: 3 }}
                style={{ paddingRight: "15px", paddingLeft: "15px" }}
              >
                <Box style={{ marginTop: "10px" }} className="searchSection">
                  <Typography className="searchInput">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search for first name, last name, cin or country...."
                      onChange={searchTextHandler}
                      value={searchText}
                    />
                    <ClearIcon className="clearIcon" onClick={searchClearHandler} />
                  </Typography>
                  <Typography onClick={searchConsumerHandler} sx={{ cursor: 'pointer', marginRight: '5px', marginLeft: '5px' , fontSize:{xs:"12px", sm:"12px", md:"16px"}}} className="searchLabel">Search</Typography>
                  {/* <Typography onClick={searchTextHandler} sx={{ cursor: 'pointer' }} className="searchLabel">Clear</Typography> */}
                </Box>
                <TableContainer
                  style={{ marginTop: "0px", background: "white" }}
                >
                  <Table
                    sx={{
                      minWidth: 150,
                    }}
                    aria-labelledby="tableTitle"
                    size="small"
                  >
                    <EnhancedTableHead />
                    <TableBody>
                      {/* Show tbale bodt data */}
                      {tableData}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[15, 50, 100]}
                  component="div"
                  count={searchRef2ForeignConsumer?.length > 0 ? searchRef2ForeignConsumer.length : data?.me?.consumers?.consumerreftree?.ref2Foreign?.edges.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default withConsumerAuth(Reference1);

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

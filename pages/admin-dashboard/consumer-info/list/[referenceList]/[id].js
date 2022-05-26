
import AdminDashboardLayout from '../../../../../components/Dashboard/AdminDashboard/AdminDashboardLayout';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useLeftReference from '../../../../../apolloClient/queries/consumer/LeftReference';
import useRightReference from '../../../../../apolloClient/queries/consumer/RightReference';
import useLeftForeignReference from '../../../../../apolloClient/queries/consumer/LeftForeignReference';
import useRightForeignReference from '../../../../../apolloClient/queries/consumer/RightForeignReference';
import getCookie from '../../../../../utils/getCookie';
import getCurrentUser from '../../../../../utils/getCurrentUser';
import withAdminAuth from '../../../../../components/Dashboard/PrivateRoute/withAdminAuth';


const topMain={ 
    fontSize: '18px',
     fontWeight: '400',
      color: '#707070' 
    }

function EnhancedTableHead(props) {
    return (
        <TableHead  >
            <TableRow>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >CIN</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Name</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Username</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Phone</TableCell>
                <TableCell

                    sx={{ background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Ref-1</TableCell>
                <TableCell
                    align="left"
                    sx={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)', marginLeft: '20px' }}
                    className="tableBorder"
                >Ref-2</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Ref-1 Foreign</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Ref-2 Foreign</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Root Level</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Refered By</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Bronch</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Silver</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Gold</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Platinum</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Gem</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Pearl</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Diamond</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Ruby</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Emerald</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Crown</TableCell>
                <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                >Paradise</TableCell>
            </TableRow>
        </TableHead >
    );
}


const ReferenceDetails = ({token, currentUser}) => {

    const [referenceData, setReferenceData] = useState([])
    const [consumerData, setConsumerData] = useState("")

    const [loading, setLoading] = useState("")
    const router = useRouter()
    const { referenceList, id } = router.query;
    console.log("reference", referenceList)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    if (referenceList === "left-reference") {
        var { data: leftRefData, loading: leftLoading, fetchMore } = useLeftReference(id);
    } else if (referenceList === "right-reference") {
        var { data: rightRefData, loading: rightLoading, fetchMore } = useRightReference(id);
    } else if (referenceList === "left-foreign-reference") {
        var { data: leftForeignRefData, loading: leftForeignLoading, fetchMore } = useLeftForeignReference(id);
    } else if (referenceList === "right-foreign-reference") {
        var { data: rightForeignRefData, loading: rightForeignLoading, fetchMore } = useRightForeignReference(id);
    } else {
        var { data: rootRefData, loading: rootLoading, fetchMore } = useRightReference(id);
    }

    useEffect(() => {
        if (leftRefData || leftLoading) {
            console.log("leftRefData",leftRefData)
            setConsumerData(leftRefData)
            setReferenceData(leftRefData?.consumer?.consumerreftree?.ref1)
            setLoading(leftLoading)
        } else if (rightRefData || rightLoading) {
            console.log("leftRefData",rightRefData)
            setConsumerData(rightRefData)
            setReferenceData(rightRefData?.consumer?.consumerreftree?.ref2)
            setLoading(rightLoading)
        } else if (leftForeignRefData || leftForeignLoading) {
            setConsumerData(leftForeignRefData)
            setReferenceData(leftForeignRefData?.consumer?.consumerreftree?.ref1Foreign)
            setLoading(rightLoading)
        } else if (rightForeignRefData || rightForeignLoading) {
            setConsumerData(rightForeignRefData)
            setReferenceData(rightForeignRefData?.consumer?.consumerreftree?.ref2Foreign)
            setLoading(rightLoading)
        }
        else {
            setConsumerData(rootRefData)
            setReferenceData(rootRefData?.consumer?.consumerreftree?.roots)
            setLoading(rootLoading)
        }
    })

    console.log("consumer Data",consumerData)
    if (loading) {
        return (
            <div>Loading data....</div>
        )
    }

    // Fetch more data when click next button
    const dataLoadHandler = (page) => {
        const { startCursor } = referenceData?.pageInfo;
        //console.log("startCursor", startCursor)
        fetchMore({
            variables: { before: startCursor, last: page },
            updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.consumer?.consumerreftree?.ref1 ? fetchMoreResult.consumer?.consumerreftree?.ref1?.edges = [
                    ...prevResult.consumer?.consumerreftree?.ref1?.edges,
                    ...fetchMoreResult.consumer?.consumerreftree?.ref1?.edges
                ]
                    :
                    fetchMoreResult.consumer?.consumerreftree?.ref2 ? fetchMoreResult.consumer?.consumerreftree?.ref2?.edges = [
                        ...prevResult.consumer?.consumerreftree?.ref2?.edges,
                        ...fetchMoreResult.consumer?.consumerreftree?.ref2?.edges
                    ]
                        :
                        fetchMoreResult.consumer?.consumerreftree?.ref1Foreign ? fetchMoreResult.consumer?.consumerreftree?.ref1Foreign?.edges = [
                            ...prevResult.consumer?.consumerreftree?.ref1Foreign?.edges,
                            ...fetchMoreResult.consumer?.consumerreftree?.ref1Foreign?.edges
                        ]
                            :
                            fetchMoreResult.consumer?.consumerreftree?.ref2Foreign ? fetchMoreResult.consumer?.consumerreftree?.ref2Foreign?.edges = [
                                ...prevResult.consumer?.consumerreftree?.ref2Foreign?.edges,
                                ...fetchMoreResult.consumer?.consumerreftree?.ref2Foreign?.edges
                            ]
                                :
                                fetchMoreResult.consumer?.consumerreftree?.roots?.edges = [
                                    ...prevResult.consumer?.consumerreftree?.roots?.edges,
                                    ...fetchMoreResult.consumer?.consumerreftree?.roots?.edges
                                ]
                return fetchMoreResult;
            }
        });

    };

    const handleChangePage = (event, newPage) => {
        const length = referenceData?.edges?.length;
        const pageData = (newPage) * 10;
        setPage(newPage);
        if (newPage && (pageData === length - 1)) {
            dataLoadHandler(10)
        }
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Show reference commison data
    const tableData = referenceData?.edges?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
            return (
                <TableRow
                    hover={true}
                    tabIndex={-1}
                    key={index}
                    style={{ background: 'rgb(247, 247, 247)' }}
                >
                    <TableCell className="tableBorder">{(page * rowsPerPage) + (++index)}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.firstName} {row.node.user.lastName}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.username}</TableCell>
                    <TableCell sx={{ width: '30px' }} className="tableBorder" align="left">{row.node.user.consumers.callingCode}{row.node.user.consumers.callingCode}</TableCell>
                    <TableCell size="small" className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.ref1Count}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.ref2Count}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.ref1ForeignCount}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.ref2ForeignCount}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.rootCount}</TableCell>
                    <TableCell className="tableBorder" sx={{ width: '430px' }} >{row.node.user.consumers.consumerreftree.referedBy}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.bronch}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.silver}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.gold}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.platinum}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.gem}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.pearl}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.diamond}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.ruby}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.emerald}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.crown}</TableCell>
                    <TableCell className="tableBorder" align="left">{row.node.user.consumers.consumerreftree.paradise}</TableCell>
                </TableRow>
            );
        })
    return (
        <div>
            <Typography
                sx={{
                    py: 3,
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign: 'center',
                    color: '#777779'
                }}
            >
                {
                    referenceList === "left-reference" ? "Reference-1 Details"
                        : referenceList === "right-reference" ? "Reference-2 Details"
                            : referenceList === "left-foreign-reference" ? "Foreign Reference-1 Details"
                                : referenceList === "right-foreign-reference" ? "Foreign Reference-2 Details"
                                    : "Root Reference Details"
                }
            </Typography>
            <Divider />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, mt: 1 }} style={{ paddingRight: '20px', paddingLeft: '20px' }} >
                    <Grid container spacing={2}>
                        <Grid sx={{ mt: 5, mb: 1 }} item xs={12} md={6}>
                            <Typography sx={topMain} variant="h4">Username: {consumerData?.consumer?.username} </Typography>
                            <Typography sx={topMain} variant="h4">Name: {consumerData?.consumer?.user?.firstName} {consumerData?.consumer?.user?.lastName} </Typography>
                            <Typography sx={topMain} variant="h4">Phone: {consumerData?.consumer?.callingCode}{consumerData?.consumer?.phone}</Typography>
                        </Grid>
                        <Grid item sx={{ mt: 5, mb: 5 }} xs={12} md={6}>

                            <Typography sx={topMain} variant="h4">Reference-1: {consumerData?.consumer?.consumerreftree?.ref1Count}</Typography>
                            <Typography sx={topMain} variant="h4">Reference-2: {consumerData?.consumer?.consumerreftree?.ref2Count}</Typography>
                            <Typography sx={topMain} variant="h4">Above roots: {consumerData?.consumer?.consumerreftree?.rootCount}</Typography>
                            <Typography sx={topMain} variant="h4">Total Reference: {(consumerData?.consumer?.consumerreftree?.ref1Count) + (consumerData?.consumer?.consumerreftree?.ref2Count)} </Typography>
                        </Grid>
                    </Grid>
                    <TableContainer style={{ marginTop: '0px', background: 'white' }} >
                        <Table
                            sx={{
                                minWidth: 800
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
                        rowsPerPageOptions={[10, 50, 100]}
                        component="div"
                        count={referenceData?.edges?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
}

export default withAdminAuth(ReferenceDetails)

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
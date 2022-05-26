import AdminDashboardLayout from "../../../components/Dashboard/AdminDashboard/AdminDashboardLayout";
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
import styles from "../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";

import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Add from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import getCookie from "../../../utils/getCookie";
import client from "../../../apolloClient/configuration/apolloConfig";
import { GET_INCENTIVES } from "../../../apolloClient/queries/incentive/IncentiveQuery";
import useDeleteIncentive from "../../../apolloClient/mutation/incentive/DeleteIncentive";
import getCurrentUser from "../../../utils/getCurrentUser";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

function createData(sl, logo, name, note) {
  return {
    sl,
    logo,
    name,
    note,
  };
}

const rows = [
  createData(
    1,
    "logo",
    "Md. Rafiqul Islam",
    "This incentive requires at least 100 reference consumers. Reference-1 requires at least 5 foreign consumers and 45 native consumers and Reference-2 requires at least 5 foreign consumers and 45 native consumers. Total = Foreign+Native => Total = (5+5)+(45+45) => Total = 100"
  ),
  createData(
    2,
    "logo",
    "Md. Mohidul Islam",
    "This incentive requires at least 100 reference consumers. Reference-1 requires at least 5 foreign consumers and 45 native consumers and Reference-2 requires at least 5 foreign consumers and 45 native consumers. Total = Foreign+Native => Total = (5+5)+(45+45) => Total = 100"
  ),
  createData(3, "logo", "Md. Foridul Islam"),
  createData(
    4,
    "logo",
    "Md. Rafiqul Islam",
    "This incentive requires at least 100 reference consumers. Reference-1 requires at least 5 foreign consumers and 45 native consumers and Reference-2 requires at least 5 foreign consumers and 45 native consumers. Total = Foreign+Native => Total = (5+5)+(45+45) => Total = 100"
  ),
  createData(5, "logo", "Md. Akramul Islam"),
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          SL.
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          Logo
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Name
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          Note
        </TableCell>
        <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(235, 235, 235)",
            width: "5%",
          }}
          className="tableBorder"
        >
          {" "}
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const allIncentives = ({ token, incentives, currentUser }) => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  // Incentive Delete Handler
  const { incentiveDeleteMutation, loading, error, reset } =
    useDeleteIncentive();

  const incentiveDeleteHandler = (id) => {
    swal({
      title: "Are you sure to Delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      className: "swal-wide",
      style: { height: "20px" },
    }).then((willDelete) => {
      if (willDelete) {
        incentiveDeleteMutation({
          variables: {
            id: id,
          },
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
          refetchQueries: [{ query: GET_CATEGORIES }],
          onCompleted: () => {
            console.log("on completed");
            router.push(
              "/admin-dashboard/incentives-commission/all-incentives"
            );
          },
        });
        reset();
        swal("Hey! Incentive has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Incentive is safe!");
      }
    });
  };

  //Show bank data and searches real time
  const tableDatas = rows.filter((search) => {
    return search.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const tableData = tableDatas
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.sl}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">{row.sl}</TableCell>
          <TableCell className="tableBorder" align="left">
            <img src="/images/bronze1.jpeg" width="60" height="60" />
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.note}
          </TableCell>
          <TableCell className="tableBorder " align="left">
            {/* <Link href={`/admin-dashboard/incentives-commission/edit-incentives/${row.sl}/`}>
              <span title='Edit Incentives' className={styles.editButton}> <EditIcon /></span>
            </Link>
            <Link href={`.delete/${row.sl}/`}>
              <span title='Delete Incentives' className={styles.DeleteButton}> <DeleteIcon /></span>
            </Link> */}
            <Link
              href={`/admin-dashboard/inventory/edit-category/${row.sl}/`}
              passHref
            >
              <Tooltip title="Update Incentive">
                <IconButton color="success">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title="Delete Incentive">
              <IconButton
                onClick={() => incentiveDeleteHandler(row.sl)}
                color="warning"
                //sx={{color:'red'}}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
      <Paper
        sx={{ width: "100%", mb: 2, mt: 3 }}
        style={{ paddingRight: "15px", paddingLeft: "15px" }}
      >
        {/* <div className={styles.addBtn}>
        <Add></Add>
          <Link href="/admin-dashboard/incentives-commission/add-incentives/">
          Add Incentives 
          </Link>
        </div> */}
        <Typography
          variant="h4"
          component="div"
          sx={{
            background: "#0DA8EE",
            width: "150px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            cursor: "pointer",
            float: "right",
            color: "#fff",
            mt: 2,
            py: 1,
          }}
        >
          <Add />
          <Link href="/admin-dashboard/incentives-commission/add-incentives/">
            Add Incentives
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
export default withAdminAuth(allIncentives);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({
    query: GET_INCENTIVES,
    fetchPolicy: "network-only",
    // custom header for every request
    context: {
      headers: {
        Authorization: `JWT ${getSessionCookie}`,
      },
    },
  });

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
      incentives: data.categories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

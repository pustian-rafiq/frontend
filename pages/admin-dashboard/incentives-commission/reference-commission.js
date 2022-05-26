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
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import getCookie from "../../../utils/getCookie";
import client from "../../../apolloClient/configuration/apolloConfig";
import { GET_REFER_COMMISSION } from "../../../apolloClient/queries/incentive/ReferCommissionQuery";
import getCurrentUser from "../../../utils/getCurrentUser";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

function createData(sl, username, fullname, amount, date_time) {
  return {
    sl,
    username,
    fullname,
    amount,
    date_time,
  };
}

const rows = [
  createData(1, "rafiqul", "Md. Rafiqul Islam", 100, "07-03-2021 12:05"),
  createData(2, "rafidul", "Md. Rafidul Islam", 100, "07-03-2021 12:05"),
  createData(3, "mim", "Md. Mim Islam", 100, "07-03-2021 12:05"),
  createData(4, "alex", "Alex Khan", 100, "07-03-2021 12:05"),
  createData(5, "skaib", "Md. Sakibul Islam", 100, "07-03-2021 12:05"),
];

function EnhancedTableHead(props) {
  const { onRequestSort } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
        >
          {" "}
          SL.
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
        >
          CIN/Username
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
        >
          {" "}
          Full Name
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
        >
          Amount
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
          sx={{ fontSize: { md: "15px", sm: "12px", xs: "10px" } }}
        >
          {" "}
          Date time
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const ReferenceCommission = ({ referCommisions, token, currentUser }) => {
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  //Show reference commison data
  const tableData = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow hover={true} tabIndex={-1} key={row.sl} className="rowHover">
          <TableCell
            sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
            className="tableBorder"
          >
            {row.sl}
          </TableCell>
          <TableCell
            sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
            className="tableBorder"
            align="left"
          >
            {row.username}
          </TableCell>
          <TableCell
            sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
            className="tableBorder"
            align="left"
          >
            {row.fullname}
          </TableCell>
          <TableCell
            sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
            className="tableBorder"
            align="left"
          >
            {row.amount}
          </TableCell>
          <TableCell
            sx={{ fontSize: { md: "15px", sm: "10px", xs: "10px" } }}
            className="tableBorder"
            align="left"
          >
            {row.date_time}
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
        <Typography
          sx={{
            py: 2,
            fontWeight: "bold",
            fontSize: { md: "20px", sm: "16px", xs: "12px" },
          }}
        >
          Today's Reference commission getting person and their amounts
        </Typography>
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
export default withAdminAuth(ReferenceCommission);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({
    query: GET_REFER_COMMISSION,
    fetchPolicy: "network-only",
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
      referCommisions: data.categories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

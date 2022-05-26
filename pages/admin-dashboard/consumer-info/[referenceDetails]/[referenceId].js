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
import { useRouter } from "next/router";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
function createData(cin, name, phone) {
  return {
    cin,
    name,
    phone,
  };
}

const rows = [
  createData("11122", "Md. Rafiqul Islam", "0963434545"),
  createData("11111", "Md. Rafidul Islam", "0963434545"),
  createData("22222", "Md. Mim Islam", "0963434545"),
  createData("33333", "Alex Khan", "00963434545"),
  createData("11111", "Md. Sakibul Islam", "0963434545"),
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          CIN
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          Name
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          Phone
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const ReferenceDetails = ({ token, currentUser }) => {
  const router = useRouter();
  const { referenceDetails, referenceId } = router.query;
  //console.log(router.query)

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
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row.sl}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">{row.cin}</TableCell>
          <TableCell className="tableBorder" align="left">
            {row.name}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.phone}
          </TableCell>
        </TableRow>
      );
    });
  return (
    <div>
      <Typography
        sx={{
          py: 3,
          fontWeight: "bold",
          fontSize: "20px",
          textAlign: "center",
          color: "#777779",
        }}
      >
        {referenceDetails === "leftreferenceDetails"
          ? "Reference-1 Details"
          : referenceDetails === "rightreferenceDetails"
          ? "Reference-2 Details"
          : "Root Details"}
      </Typography>
      <Divider />
      <Box sx={{ width: "100%", pt: 1 }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3 }}
          style={{ paddingRight: "50px", paddingLeft: "50px" }}
        >
          <Grid container spacing={2}>
            <Grid sx={{ mt: 5, mb: 5 }} item xs={12} md={6}>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                CIN: 11111{" "}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                Name: Dr.Md Dulal{" "}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                Phone: 8801735414183
              </Typography>
            </Grid>
            <Grid item sx={{ mt: 5, mb: 5 }} xs={12} md={6}>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                Total Reference: 0{" "}
              </Typography>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                Reference-1: 0
              </Typography>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                Reference-2: 0
              </Typography>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#6C757D" }}
                variant="h4"
              >
                Above roots: 6
              </Typography>
            </Grid>
          </Grid>
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
    </div>
  );
};

export default withAdminAuth(ReferenceDetails);

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

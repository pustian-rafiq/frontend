import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

const label = { inputProps: { "aria-label": "Switch demo" } };
const rows = [
  {
    sl: 1,
    author: "H. M. A. Ehsan",
    headline:
      "It is the only company in the world run by the brand new Ehsan Marketing System.",
    link1: "https://www.google.com/",
    link2: "https://www.ehsansoftware.com/",
    description:
      "It is the only company in the world run by the brand new Ehsan Marketing System.",
  },
  {
    sl: 2,
    author: "H. M. A. Ehsan",
    headline:
      "It is the only company in the world run by the brand new Ehsan Marketing System.",
    link1: "https://www.google.com/",
    link2: "https://www.ehsansoftware.com/",
    description:
      "It is the only company in the world run by the brand new Ehsan Marketing System.",
  },
  {
    sl: 3,
    author: "H. M. A. Ehsan",
    headline:
      "It is the only company in the world run by the brand new Ehsan Marketing System.",
    link1: "https://www.google.com/",
    link2: "https://www.ehsansoftware.com/",
    description:
      "It is the only company in the world run by the brand new Ehsan Marketing System.",
  },
];

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
          Serial
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
          Author
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          Headline
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Image
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Advertise Image1
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Advertise Link1
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Advertise Image2
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Advertise Link2
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          Description
        </TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
          className="tableBorder"
        >
          {" "}
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const AllHeadline = ({ token, currentUser }) => {
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

  const tableData = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow hover={true} tabIndex={-1} key={row.sl} className="rowHover">
          <TableCell className="tableBorder">{row.sl}</TableCell>
          <TableCell className="tableBorder" align="left">
            {row.author}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.headline}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            <img src="/images/bronze1.jpeg" width="60" height="60" />
          </TableCell>
          <TableCell className="tableBorder" align="left">
            <img src="/images/bronze1.jpeg" width="60" height="60" />
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.link1}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            <img src="/images/bronze1.jpeg" width="60" height="60" />
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.link2}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.description}
          </TableCell>
          <TableCell className="tableBorder ">
            <Link
              href={`/admin-dashboard/media-info/media/update/${row.sl}/`}
              passHref
            >
              <Typography
                variant="span"
                component="span"
                sx={{
                  mr: 1,
                  cursor: "pointer",
                  background: "#4F5ECE",
                  borderRadius: "3px",
                  padding: "5px 2px",
                }}
              >
                <Tooltip title="Update Notice">
                  <IconButton sx={{ color: "#fff", fontSize: "10px" }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Link>
            <Link
              href={`/admin-dashboard/media-info/media/delete/${row.sl}/`}
              passHref
              style={{ marginTop: "10px" }}
            >
              <Typography
                variant="span"
                component="span"
                sx={{
                  mr: 1,
                  cursor: "pointer",
                  mt: 2,
                  background: "#FB160A",
                  borderRadius: "3px",
                  padding: "5px 2px",
                }}
              >
                <Tooltip title="Delete Notice">
                  <IconButton sx={{ color: "#fff", fontSize: "10px" }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
        }}
      >
        Notices
      </Typography>
      <Divider />
      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3 }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              background: "#0DA8EE",
              width: "145px",
              fontSize: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              float: "right",
              color: "#fff",
              borderRadius: "20px",
              mt: 2,
              cursor: "pointer",
              py: 1,
              mb: 1,
            }}
          >
            <Add />
            <Link href="/admin-dashboard/media-info/notice/add-notice/">
              Add Notice
            </Link>
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
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
    </Box>
  );
};

export default withAdminAuth(AllHeadline);

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

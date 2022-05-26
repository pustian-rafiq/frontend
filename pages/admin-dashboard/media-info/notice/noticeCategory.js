import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
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
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
const label = { inputProps: { "aria-label": "Switch demo" } };
const rows = [
  {
    sl: 1,
    title:
      "Consumer Service Email- cs.ehsanmarketing@gmail.com (কঞ্জুমার সার্ভিস ইমেইল- cs.ehsanmarketing@gmail.com)",
    description:
      "Consumer Service Email- cs.ehsanmarketing@gmail.com (কঞ্জুমার সার্ভিস ইমেইল- cs.ehsanmarketing@gmail.com)",
  },
  {
    sl: 2,
    title:
      "We do not have an official page on Facebook (ফেসবুকে আমাদের অফিসিয়াল কোন পেইজ নেই)",
    description:
      "We do not have an official page on Facebook (ফেসবুকে আমাদের অফিসিয়াল কোন পেইজ নেই)",
  },
  {
    sl: 3,
    title:
      "***Keep everyone subscribing to our YouTube channel to get updated information (আপডেট তথ্য পেতে সবাই আমাদের ইউটিউব চ্যানেল সাবস্ক্রাইব করে রাখুন)",
    description:
      "***Keep everyone subscribing to our YouTube channel to get updated information (আপডেট তথ্য পেতে সবাই আমাদের ইউটিউব চ্যানেল সাবস্ক্রাইব করে রাখুন)",
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
          Title
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
          Description
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
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const NoticeCategory = ({ token, currentUser }) => {
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [checked, setChecked] = useState(false);

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
            {row.title}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row.description}
          </TableCell>
          <TableCell
            className="tableBorder "
            style={{ width: "15%" }}
            align="left"
          >
            <Link
              href={`/admin-dashboard/media-info/notice/edit-category/${row.sl}/`}
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
                  padding: "10px 2px",
                }}
              >
                <Tooltip title="Update Notice Category">
                  <IconButton sx={{ color: "#fff" }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Link>
            <Link href={`/admin-dashboard/tax/update/${row.sl}/`} passHref>
              <Typography
                variant="span"
                component="span"
                sx={{
                  mr: 1,
                  cursor: "pointer",
                  background: "#FB160A",
                  borderRadius: "3px",
                  padding: "10px 2px",
                }}
              >
                <Tooltip title="Delete Notice">
                  <IconButton sx={{ color: "#fff" }}>
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
        Notice Category
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
              width: "180px",
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
              mb: 2,
            }}
          >
            <Add />
            <Link href="/admin-dashboard/media-info/notice/add-notice-category/">
              Add Notice Category
            </Link>
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

export default withAdminAuth(NoticeCategory);

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

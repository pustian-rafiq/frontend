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

import TableSortLabel from "@mui/material/TableSortLabel";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
  faTruckPickup,
  faPeopleCarryBox,
  faPeopleCarry,
} from "@fortawesome/free-solid-svg-icons";

import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import useCurrentUserProducts from "../../../../apolloClient/queries/products/currentUserProducts";
import useDeleteProduct from "../../../../apolloClient/mutation/product/deleteProduct";
import useCurrentUserSalesOrder from "../../../../apolloClient/queries/order/currentUserSalesOrder";

const headCells = [
  {
    id: "serial",
    numeric: false,
    disablePadding: false,
    label: "Serial",
  },
  {
    id: "orderNo",
    numeric: false,
    disablePadding: false,
    label: "Order No",
  },
  {
    id: "totalAnount",
    numeric: false,
    disablePadding: false,
    label: "Total Amount",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "payment",
    numeric: false,
    disablePadding: false,
    label: "Payment",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={"normal"}
            style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
            className="tableBorder"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const mySales = ({ token }) => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, loading } = useCurrentUserSalesOrder(token);

  console.log("data", data);

  const { productDelete } = useDeleteProduct();

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

  //Show bank data and searches real time
  const tableDatas =
    data?.me?.consumers?.sellersOrderedhhopproducts?.edges?.filter((search) => {
      return search.node.shopInvoiceNo
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

  const tableData = tableDatas
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((row, index) => {
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row?.node?.id}
          style={{ background: "rgb(247, 247, 247)" }}
          className="rowHover"
        >
          <TableCell
            className="tableBorder"
            id={labelId}
            component="th"
            scope="row"
            align="center"
          >
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row?.node?.shopInvoiceNo}
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row?.node?.totalPrice}
          </TableCell>

          <TableCell className="tableBorder" align="center">
            <Typography
              sx={{
                backgroundColor: "#fb8c00",
                p: "5px",
                textAlign: "center",
                color: "#ffffff",
                borderRadius: "5px",
              }}
              boxShadow="inherit"
            >
              Pending
            </Typography>
          </TableCell>
          <TableCell className="tableBorder" align="center">
            {row?.node?.isVendorPaid ? (
              <Typography
                sx={{
                  backgroundColor: "green",
                  px: "10px",
                  py: "5px",
                  textAlign: "center",
                  color: "#ffffff",
                  borderRadius: "5px",
                }}
                boxShadow="inherit"
              >
                Paid
              </Typography>
            ) : (
              <Button variant="contained">Pay</Button>
            )}
          </TableCell>

          <TableCell
            className="tableBorder "
            align="center"
            style={{ width: "15%" }}
          >
            <Link
              href={`/consumer-dashboard/inventory/order/sale/${row.node.id}`}
              passHref
            >
              <Tooltip title="View Order">
                <IconButton sx={{ color: "#0DA8EE", fontSize: "20px" }}>
                  <FontAwesomeIcon icon={faEye} />
                </IconButton>
              </Tooltip>
            </Link>
            <Button size="small" variant="contained">
              Deliver Now
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <div>
      <Typography
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
        }}
      >
        My Sales List
      </Typography>
      <Divider />

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, textAlign: "center" }}
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          <div style={{ marginTop: "10px" }} className="searchSection">
            <div className="searchLabel">Search</div>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search by order number..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <ClearIcon className="clearIcon" onClick={searchTextHandler} />
            </div>
          </div>
          {!loading ? (
            <Box>
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
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={
                  data?.me?.consumers?.sellersOrderedhhopproducts?.edges?.length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default withConsumerAuth(mySales);

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

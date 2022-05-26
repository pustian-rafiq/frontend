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
import { styled } from "@mui/material/styles";

import TableSortLabel from "@mui/material/TableSortLabel";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  tooltipClasses,
} from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import useCurrentUserPurchaseOrder from "../../../../apolloClient/queries/order/currentUserPurchaseOrder";

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array = [], comparator) {
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

const BkashTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#e43573",
    color: "#ffffff",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const headCells = [
  {
    id: "serial",
    isCurrency: false,
    disablePadding: true,
    label: "Serial",
  },
  {
    id: "orderNO",
    isCurrency: false,
    disablePadding: false,
    label: "Order No",
  },
  {
    id: "quantity",
    isCurrency: false,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "vat",
    isCurrency: true,
    disablePadding: false,
    label: "VAT",
  },
  {
    id: "totalCommission",
    isCurrency: true,
    disablePadding: false,
    label: "Total Commission",
  },
  {
    id: "discount",
    isCurrency: true,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "offerPrice",
    isCurrency: true,
    disablePadding: false,
    label: "Offer Price",
  },
  {
    id: "totalShippingCost",
    isCurrency: true,
    disablePadding: false,
    label: "Total Shipping Cost",
  },
  {
    id: "totalPayableAmt",
    isCurrency: true,
    disablePadding: false,
    label: "Total Payable Amount",
  },
  {
    id: "payment",
    isCurrency: false,
    disablePadding: false,
    label: "Payment",
  },
  {
    id: "action",
    isCurrency: false,
    disablePadding: false,
    label: "Action",
  },
];

const myPurchases = ({ token, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, loading } = useCurrentUserPurchaseOrder(token);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const searchTextHandler = () => {
    setSearchText("");
  };

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={"none"}
              style={{ paddingLeft: "10px", background: "rgb(235, 235, 235)" }}
              sortDirection={orderBy === headCell.id ? order : false}
              className="tableBorder"
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.isCurrency
                  ? `${headCell.label}(${currentUser.consumers.country.currenciesSymbol})`
                  : headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
    //   onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Show bank data and searches real time
  const tableDatas = data?.me?.consumers?.orders?.edges?.filter((search) => {
    return search.node.orderNo
      .toString()
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  const tableData = stableSort(tableDatas, getComparator(order, orderBy))
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
          >
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.orderNo}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.quantity}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.vatPrice.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.commission.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.discount.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.offerPrice.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.totalShippingCost.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.totalPayableAmt.toFixed(2)}
          </TableCell>

          <TableCell className="tableBorder" align="left">
            {row?.node?.isPaid ? (
              <BkashTooltip title={`TrxID: ${row?.node?.trxId}`}>
                <Typography
                  sx={{
                    backgroundColor: "orange",
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
              </BkashTooltip>
            ) : (
              <Link
                href={`/consumer-dashboard/inventory/order/payment/${row.node.id}`}
                // passHref
              >
                <Button variant="contained" color="warning">
                  Payment
                </Button>
              </Link>
            )}
          </TableCell>
          <TableCell
            className="tableBorder "
            align="left"
            sx={{ display: "flex" }}
          >
            <Link
              href={`/consumer-dashboard/inventory/order/purchase/${row.node.id}`}
              passHref
            >
              <Tooltip title="View Order">
                <IconButton sx={{ color: "#0DA8EE", fontSize: "24px" }}>
                  <FontAwesomeIcon icon={faEye} />
                </IconButton>
              </Tooltip>
            </Link>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <div>
        <Typography
          sx={{
            fontSize: "30px",
            textAlign: "center",
            fontWeight: "bold",
            color: "#6C757D",
          }}
        >
          My Purchase List
        </Typography>
        <Divider />

        <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
          <Paper
            sx={{
              width: "100%",
              mb: 2,
              mt: 3,
              textAlign: "center",
              px: "15px",
              pt: 3,
            }}
          >
            <Box className="searchInput">
              <input
                type="text"
                placeholder="Search by order number..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <ClearIcon className="clearIcon" onClick={searchTextHandler} />
            </Box>

            {!loading ? (
              <Box sx={{ my: 3 }}>
                <TableContainer
                  style={{ marginTop: "0px", background: "white" }}
                >
                  <Table
                    sx={{
                      minWidth: 750,
                    }}
                    aria-labelledby="tableTitle"
                    size="small"
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={tableDatas?.length}
                    />
                    <TableBody>
                      {/* Show tbale bodt data */}
                      {tableData}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  component="div"
                  count={data?.me?.consumers?.orders?.edges?.length}
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
    </>
  );
};

export default withConsumerAuth(myPurchases);

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

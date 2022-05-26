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
import styles from "../../../../pages/consumer-dashboard/commisions/directcommision/DirectCommision.module.css";

import ClearIcon from "@mui/icons-material/Clear";
import { Button, Tooltip, tooltipClasses, Typography } from "@mui/material";
import Link from "next/link";

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

function EnhancedTableHead() {
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
          SL.
        </TableCell>
        {/* <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          Created Date
        </TableCell> */}
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
          Receiver CIN
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
          Total Amt
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
          Total Amt USD
        </TableCell>
        {/* <TableCell
          align="left"
          style={{
            paddingLeft: "10px",
            background: "rgb(247, 247, 247)",
            background: "rgb(235, 235, 235)",
          }}
          className="tableBorder"
        >
          TrxID
        </TableCell> */}
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
          Payment
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const PendingPayment = ({ directCommissionGroups }) => {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
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

  //Show bank data and searches real time
  const tableDatas =
    directCommissionGroups?.directCommissionGroups?.edges?.filter((search) => {
      return search?.node?.consumer?.username
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchText.toLowerCase());
    });

  const tableData = tableDatas
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((row, index) => {
      return (
        <TableRow
          hover={true}
          tabIndex={-1}
          key={row?.node?.id}
          style={{ background: "rgb(247, 247, 247)" }}
        >
          <TableCell className="tableBorder">
            {page * rowsPerPage + ++index}
          </TableCell>

          <TableCell className="tableBorder" align="left">
            {row?.node?.directCommission?.edges?.map((commission) => (
              <p key={commission?.node?.id}>
                {commission?.node?.consumerReceiver.username}
              </p>
            ))}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.payableAmountTk?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="left">
            {row?.node?.payableAmountUsd?.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder " align="left">
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
                href={`../../../../consumer-dashboard/commisions/directcommision/payment-selected/${row?.node?.id}/`}
              >
                <Button className={styles.paymentButton}>Pay Now</Button>
              </Link>
            )}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
      <Paper
        sx={{ width: "100%", mb: 2, mt: 3, pt: 2 }}
        style={{ paddingRight: "15px", paddingLeft: "15px" }}
      >
        <Box style={{ marginTop: "10px" }} className="searchSection">
          <Typography className="searchLabel">Search</Typography>
          <Box className="searchInput">
            <input
              type="text"
              placeholder="Search for name, address and others.."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <ClearIcon className="clearIcon" onClick={searchTextHandler} />
          </Box>
        </Box>
        <TableContainer
          sx={{ pt: 3 }}
          style={{ marginTop: "0px", background: "white" }}
        >
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
          count={tableDatas?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
export default PendingPayment;

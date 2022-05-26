import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';


function createData(sl, date, requisitionamt, taxamt, trxid, trxinfo) {
  return {
    sl,
    date,
    requisitionamt,
    taxamt,
    trxid,
    trxinfo,
  };
}

const rows = [
  createData(1, '05-03-2022', 50, 3.5,'we3445565rfgf', 'Details'),
  createData(2, '05-03-2022', 60, 4.5,'we3445565rfgf', 'Details'),
  createData(3, '05-03-2022', 670, 5.5,'we3445565rfgf', 'Details'),
  createData(4, '05-03-2022', 500, 6.5,'we3445565rfgf', 'Details'),
];

function EnhancedTableHead(props) {
  return (
    <TableHead  >
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        > SL.</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >Date</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >Requisition Amount (৳)</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >TAX Amount(৳)</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >TrxID</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', background: 'rgb(247, 247, 247)', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >TAX info</TableCell>
      </TableRow>
    </TableHead >
  );
}


const TransactionHistory = () => {
  const [page, setPage] = useState(0);
  const [dense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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
  //Show transaction history data
  const tableData = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
        className="rowHover"
          tabIndex={-1}
          key={row.sl}
          style={{ background: 'rgb(247, 247, 247)' }}
        >
          <TableCell className="tableBorder" >{row.sl}</TableCell>
          <TableCell className="tableBorder" align="left">{row.date}</TableCell>
          <TableCell className="tableBorder" align="left">{row.requisitionamt}</TableCell>
          <TableCell className="tableBorder" align="left">{row.taxamt}</TableCell>
          <TableCell className="tableBorder" align="left">{row.trxid}</TableCell>
          <TableCell className="tableBorder" align="left">{row.trxinfo}</TableCell>
        </TableRow>
      );
    })


  return (
    <>
      <div>
        <div className="paymentTitle">
          <span>Withdraw Transaction History</span>
        </div>
        <Divider sx={{ mb: 5 }} />

        <Box sx={{ width: '100%' }} style={{ paddingRight: '5px' }} >
          <Paper sx={{ width: '100%', mb: 2, mt: 3 }} style={{ paddingRight: '15px', paddingLeft: '15px' }} >
            <div style={{ marginTop: '10px' }} className="searchSection" ></div>
            <TableContainer style={{ marginTop: '0px', background: 'white' }} >
              <Table
                sx={{
                  minWidth: 750
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
              rowsPerPageOptions={[100, 200, 500]}
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
    </>
  );
}
export default TransactionHistory;

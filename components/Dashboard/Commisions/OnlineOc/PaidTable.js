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
import {Divider } from '@mui/material';

function createData(sl, date, amount) {
  return {
    sl,
    date,
    amount
  };
}

const rows = [
  createData(1, 'Aug. 21, 2021, 8:49 a.m.', 7.5),
  createData(2, 'Aug. 21, 2021, 8:49 a.m.', 7.5),
  createData(3, 'Aug. 21, 2021, 8:49 a.m.', 9),
  createData(4, 'Aug. 21, 2021, 8:49 a.m.', 5),
  createData(5, 'Aug. 21, 2021, 8:49 a.m.', 6),
  createData(6, 'Aug. 21, 2021, 8:49 a.m.', 6),
  createData(7, 'Aug. 21, 2021, 8:49 a.m.', 6),
  createData(8, 'Aug. 21, 2021, 8:49 a.m.', 6),
  createData(9, 'Aug. 21, 2021, 8:49 a.m.', 6),
  createData(10, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(11, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(12, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(13, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(14, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(15, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(16, 'Aug. 21, 2021, 8:49 a.m.', 7),
  createData(17, 'Aug. 21, 2021, 8:49 a.m.', 7),
];

function EnhancedTableHead(props) {
  return (
    <TableHead  >
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px',width:'200',  background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        > SL.</TableCell>
        <TableCell
          align="left"
          style={{textAlign:'center',paddingLeft: '10px',width:'200', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >Date</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px',width:'200', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >Amount</TableCell>
      </TableRow>
    </TableHead >
  );
}


const PaidTable = () => {
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
  //Show online puchase pending commision data
var totalAmount = 0
  const tableData = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
        totalAmount += row.amount
      return (
        <TableRow
        className="rowHover"
          tabIndex={-1}
          key={index}
          style={{width:'50%', background: 'rgb(247, 247, 247)' }}
        >
          <TableCell className="tableBorder " style={{ width:'5%'}} >{row.sl}</TableCell>
          <TableCell className="tableBorder" style={{ textAlign:'center'}} align="left">{row.date}</TableCell>
          <TableCell   className="tableBorder" style={{ width:'5%'}} align="left">{row.amount}</TableCell>
        </TableRow>
      );
    })


  return (
    <>
      <div>
        <div className="paymentTitle">
          <span>Paid List:</span>
        </div>
        <Divider sx={{ mb: 5 }} />

        <Box sx={{ width: '100%' }} style={{ paddingRight: '5px' }} >
          <Paper sx={{ width: '100%', mb: 2, mt: 3 }} style={{ paddingRight: '15px', paddingLeft: '15px' }} >
            <div style={{ marginTop: '10px' }} className="searchSection" ></div>
            <TableContainer style={{ marginTop: '0px', background: 'white' }}  >
              <Table
                sx={{

                  minWidth: 150
                }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EnhancedTableHead />
                <TableBody>
                  {/* Show tbale bodt data */}
                  {tableData}
                  <TableRow
                    hover={true}
                    tabIndex={-1}
                    style={{ background: 'rgb(247, 247, 247)' }}
                  >
                    <TableCell  style={{width: 200}}>Total</TableCell>
                    <TableCell style={{width: 200}} align="left"></TableCell>
                    <TableCell style={{width: 200}} align="left">{totalAmount}</TableCell>
                  </TableRow>


                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 13 : 13) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10,50,100, 200, 500]}
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
export default PaidTable



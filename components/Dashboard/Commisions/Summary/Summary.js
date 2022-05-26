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

function createData(amount) {
  return {
    amount
  };
}

const rows = [
  createData(7.5),
  createData(7.5),
  createData(7.5),
  createData(7.5),
];

function EnhancedTableHead(props) {
  return (
    <TableHead  >
      <TableRow>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', width: '200', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >Received Commissions Field</TableCell>
        <TableCell
          align="left"
          style={{ paddingLeft: '10px', width: '200', background: 'rgb(235, 235, 235)' }}
          className="tableBorder"
        >Total</TableCell>
      </TableRow>
    </TableHead >
  );
}


const Summary = () => {
 
  return (
    <div>
      <div className="paymentTitle">
        <span>Commissions Summary</span>
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
              className="table"
            >
              <TableHead  >
                <TableRow   className="rowHover">
                  <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', width: '200', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                  >Received Commissions Field</TableCell>
                  <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', width: '200', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                  >Total</TableCell>
                </TableRow>
              </TableHead >
              <TableBody className="table">
                {/* Show tbale bodt data */}

                <TableRow   className="rowHover" tabIndex={-1} style={{ background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{ width: '5%' }} className="tableBorder" >Direct Received Purchase Commission</TableCell>
                  <TableCell style={{ width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
                <TableRow   className="rowHover" tabIndex={-1} style={{ background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{ width: '5%' }} className="tableBorder" >Online Received Purchase Commission</TableCell>
                  <TableCell style={{ width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
                <TableRow   className="rowHover" tabIndex={-1} style={{ background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{ width: '5%' }} className="tableBorder" >Reference Commission</TableCell>
                  <TableCell style={{ width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
                <TableRow  className="rowHover" tabIndex={-1} style={{  background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{fontSize:'16px',fontWeight:'bold', width: '5%' }} className="tableBorder" >Total Received Commission Amount:</TableCell>
                  <TableCell style={{fontSize:'16px',fontWeight:'bold', width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: '10px' }} className="searchSection" ></div>
        </Paper>
      </Box>

      {/* Bottom Table */}

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
              <TableHead  >
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', width: '200', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                  >Pending Commissions Field</TableCell>
                  <TableCell
                    align="left"
                    style={{ paddingLeft: '10px', width: '200', background: 'rgb(235, 235, 235)' }}
                    className="tableBorder"
                  >Total</TableCell>
                </TableRow>
              </TableHead >
              <TableBody >
                {/* Show tbale bodt data */}

                <TableRow   className="rowHover" tabIndex={-1} style={{ background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{ width: '5%' }} className="tableBorder" >Online Received Purchase Commission</TableCell>
                  <TableCell style={{ width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
                <TableRow   className="rowHover" tabIndex={-1} style={{ background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{ width: '5%' }} className="tableBorder" >Online Purchase Commission Pending</TableCell>
                  <TableCell style={{ width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
                <TableRow   className="rowHover" tabIndex={-1} style={{  background: 'rgb(247, 247, 247)' }}>
                  <TableCell style={{fontSize:'16px',fontWeight:'bold', width: '5%' }} className="tableBorder" >Total Received Commission Amount:</TableCell>
                  <TableCell style={{fontSize:'16px',fontWeight:'bold', width: '5%' }} className="tableBorder" align="left">30</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: '10px' }} className="searchSection" ></div>
        </Paper>
      </Box>
    </div>
  )
}

export default Summary
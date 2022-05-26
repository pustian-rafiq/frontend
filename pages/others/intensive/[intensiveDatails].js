import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../../../components/Header/Title';

const TestDynamuc = () => {

    function createData(SL, Name,photo,incentive) {
  return { SL, Name,photo,incentive};
}

const rows = [
  createData(1, "Ehsan", `/images/avater.jpg`,`/images/bronch.jpg`),
  createData(2, "Najmula", `/images/avater2.jpg`,`/images/bronch.jpg`),


];
    return (

        <> 
            <Title>Ehsan Achrives Details</Title>

            {/* incentive details title  */}
                <Typography variant='body1' sx={{
            
                    fontSize:{md:'22px',sm:'18px',xs:'14px'},
                    letterSpacing:'1px',
                    ml:{md:'120px',sm:'20px',xs:'20px'},
                    fontWeight:{xs:'500',sm:'300'},
                    my:{xs:'15px',sm:'0px'},
                    textAlign:{xs:'center',sm:'left'}
                }}>
                    Bronch Achievers
                </Typography>
            
            {/* incentive details body  */}

            <TableContainer component={Paper}>
            <Table sx={{ width: '80%',m:'25px auto'}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Sl</TableCell>
                    <TableCell align="left" >Name</TableCell>
                    <TableCell align="left">photo</TableCell>
                    <TableCell align="left">incentives</TableCell>
                
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.Name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.SL}
                    </TableCell>
                    {/* <TableCell align="right">{row.SL}</TableCell> */}
                    <TableCell align="left" sx={{fontSize:'13px'}}>{row.Name}</TableCell>

                    
                    
                    <TableCell align="left" sx={{color:'#007bff',fontSize:'13px',cursor:'pointer'}}>
                        <img src={row.photo} alt="consumer-photo" height="40" />
                    </TableCell>

                    <TableCell align="left" sx={{color:'#007bff',fontSize:'13px',cursor:'pointer'}}>   
                        <img src={row.incentive} alt="incentives" height="30" />   
                    </TableCell>

                    </TableRow>

                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default TestDynamuc;
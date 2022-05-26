import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";
import Title from '../../components/Header/Title';


const incentiveArchivers = () => {
function createData(SL, CategoryName,Achirever) {
  return { SL, CategoryName,Achirever};
}

const rows = [
  createData(1, "Bronch", `Achiever's`),
  createData(2, 'Silver', `Achiever's`),
  createData(3, 'Gold',`Achiever's` ),
  createData(4, 'Platinum', `Achiever's`),
  createData(5, 'Gem', `Achiever's`),
  createData(6, 'Pearl', `Achiever's`),
  createData(7, 'Diamond', `Achiever's`),
  createData(8, 'Ruby', `Achiever's`),
  createData(9, 'Emerald', `Achiever's`),
  createData(10, 'Crown', `Achiever's`),
  createData(11, 'Paradise', `Achiever's`),

];
    return (
        <> 
            <Title>Intensive & Achricevs </Title>
            

            <Container> 
                <Box sx={{my:'35px'}}>
                
                <Typography variant='body1' sx={{
            
                    fontSize:{md:'22px',sm:'18px',xs:'14px'},
                    letterSpacing:'1px',
                    ml:{md:'120px',sm:'20px',xs:'20px'},
                    fontWeight:'300',
                    my:{xs:'15px',sm:'0px'}
                }}>
                    Eleven Category Incentive and Achiever's.
                </Typography>

                {/* Table of archiver's list  */}
                

        <TableContainer component={Paper}>
        <Table sx={{ width: '80%',m:'25px auto'}} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Sl</TableCell>
                <TableCell align="left">Category Name</TableCell>
                <TableCell align="left">Achiver's</TableCell>
            
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.SL}
                </TableCell>
                {/* <TableCell align="right">{row.SL}</TableCell> */}
                <TableCell align="left" sx={{fontSize:'13px'}}>{row.CategoryName}</TableCell>

                 <Link href={`/others/intensive/intensiveDatails`}>
                  
                  <TableCell align="left" sx={{color:'#007bff',fontSize:'13px',cursor:'pointer'}}>{row.Achirever}</TableCell>

                  </Link>
     

                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>


                    
                </Box>
            </Container>
      </>
    );
};

export default incentiveArchivers;


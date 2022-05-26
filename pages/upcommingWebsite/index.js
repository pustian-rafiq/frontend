import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Title from '../../components/Header/Title';

const comeingSoon = {
  backgroundImage: "url('/images/commingsoon.jpg')",
  width:"100%",
  height:"100vh",
  backgroundSize:'cover',
  backgroundPosition:"center center"
}
const upcomming = () => {
    return (
        <Box sx={comeingSoon}>
             {/* <Typography variant='h1' style={{color:'#ffffff'}}>Our Website</Typography> */}
             <Title>comming soon website </Title>
        </Box>
    );
};

export default upcomming;
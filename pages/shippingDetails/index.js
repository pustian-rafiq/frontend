import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBoxOpen

} from "@fortawesome/free-solid-svg-icons";
import Title from '../../components/Header/Title';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 32,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
     backgroundImage:'linear-gradient(136deg, rgb(101, 249, 96) 0%, rgb(30, 179, 17) 50%, rgb(16, 130, 82) 100%)'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
     backgroundImage:'linear-gradient(136deg, rgb(101, 249, 96) 0%, rgb(30, 179, 17) 50%, rgb(16, 130, 82) 100%)'
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 70,
  height: 70,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
     backgroundImage:'linear-gradient(136deg, rgb(101, 249, 96) 0%, rgb(30, 179, 17) 50%, rgb(16, 130, 82) 100%)'


  }),
  ...(ownerState.completed && {
     backgroundImage:'linear-gradient(136deg, rgb(101, 249, 96) 0%, rgb(30, 179, 17) 50%, rgb(16, 130, 82) 100%)'
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Check fontSize="large"/>,
    2: <FontAwesomeIcon icon={faBoxOpen} style={{fontSize:'22px'}}/>,
    3: <img src="/images/shipping.png"  alt="prepare"/>,
    4: <img src="/images/curier.png"  alt="curier-order"/>,
    5: <img src="/images/final.png"  alt="final-order"/>,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['অর্ডার গ্রহণ করা হয়েছে', 'অর্ডার প্রস্তুতিকরণ চলছে', 'অর্ডার প্রস্তুত হয়েছে','অর্ডার কুরিয়ারের কাছে','সম্ভাব্য ডেলিভারি'];

const shippingDetails = () => {
    return (
      <> 
      <Title> Shipping Details </Title>
        <Container>
            <Box>
                <Paper elevation={3} sx={{p:'20px 15px',borderTop:'4px solid rgb(30, 179, 17)',my:'20px'}}>
                    <Typography variant='body1' sx={{fontSize:'20px',lineHeight:'28px',marginBottom:'10px',borderBottom:' 1px dashed #cec8c8',p:'0px 0px 15px 0px'}}>Your Order Delivery Information</Typography>

                {/* stepper option in the process order */}

                    <Box sx={{my:'40px'}}>
                        <Stack sx={{ width: '100%' }} spacing={4} >
                    
                            <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                                {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                        </Stack>
                    </Box>
                </Paper>


            
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                          <Paper elevation={3} sx={{p:'20px 15px',borderTop:'3px solid rgb(30, 179, 17)',my:'20px'}}>
                            <Typography variant='body1' sx={{fontSize:'20px',marginBottom:'10px',p:'0px 0px 15px 0px',borderBottom:'1px dashed #cec8c8'}}>Delivery Address</Typography>

                            <Typography 
                              variant='caption' fontSize="medium">
                              Home :  <br/> 
                              <span style={{fontSize:'13px'}}>JahurulNagor,Bogura Sador,Code:12345,Bogura Sador,Bandladesh.</span> 
                            </Typography>
                            <Divider/>
                              <Typography variant='body2' sx={{padding:'10px 0px'}}>
                              Phone: 01816910556
                            </Typography>
                          </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8} lg={8}>
                          <Paper elevation={3} sx={{p:'20px 15px',borderTop:'3px solid rgb(30, 179, 17)',my:'20px'}}>
                              <Typography variant='body1' sx={{fontSize:'20px',marginBottom:'10px',p:'0px 0px 15px 0px'}}>Order Summary</Typography>
                            
                           
                           {/* order summary details  */}

                              <Grid container spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                                {/* <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>  */}

                                 <Grid item xs={6} sm={6} md={3}>
                                   <img src="/images/products/m-9.jpeg" alt="products" height="80"></img>
                                 </Grid>

                                 <Grid item xs={6} sm={6} md={3}>
                                    <Typography variant='body2'>Object Orient Programming</Typography>
                                    <Typography variant="caption">we love programming,,,</Typography>
                                 </Grid>

                                 <Grid item xs={4} sm={2} md={3}>
                                  <Typography variant='body2'>
                                     Price : <del style={{color:'red'}}>150 Tk.</del> 354 Tk.
                                  </Typography> 
                                 </Grid>

                                 <Grid item xs={4} sm={2} md={1}>
                                    <Typography variant='body2'>
                                        Qty : 1
                                    </Typography>
                                  </Grid>

                                 <Grid item xs={4} sm={2} md={2}>Tk.599</Grid>

                              {/* </Box> */}

                              </Grid>

                              <Divider  sx={{mt:'7px'}}/>

                                  <Grid container spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                                {/* <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>  */}

                                 <Grid item xs={6} sm={3} md={3}>
                                   <img src="/images/products/m-6.jpeg" alt="products" height="80"></img>
                                 </Grid>

                                 <Grid item xs={6} sm={3} md={3}>
                                    <Typography variant='body2'>Ehsan Marketing</Typography>
                                    <Typography variant="caption">ecommerce sites</Typography>
                                 </Grid>
                                
                       

                                 <Grid item xs={4} sm={2} md={3}>
                                  <Typography variant='body2'>
                                     Price : <del style={{color:'red'}}>150 Tk.</del> 354 Tk.
                                  </Typography> 
                                 </Grid>

                                 <Grid item xs={4} sm={2} md={1}>
                                    <Typography variant='body2'>
                                        Qty : 1
                                    </Typography>
                                  </Grid>

                                 <Grid item xs={4} sm={2} md={2}>Tk.599</Grid>

                              {/* </Box> */}

                              </Grid>

                            <Divider  sx={{my:'7px'}}/>


                              <Grid container spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                                {/* <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>  */}

                                 <Grid item xs={6} sm={3} md={3}>
                                   <img src="/images/products/m-10.jpg" alt="products" height="80"></img>
                                 </Grid>

                                 <Grid item xs={6} sm={3} md={3}>
                                    <Typography variant='body2'>React </Typography>
                                    <Typography variant="caption">web programming,,,</Typography>
                                 </Grid>

                                 <Grid item xs={4} sm={2} md={3}>
                                  <Typography variant='body2'>
                                     Price : <del style={{color:'red'}}>150 Tk.</del> 354 Tk.
                                  </Typography> 
                                 </Grid>

                                 <Grid item xs={4} sm={1} md={1}>
                                    <Typography variant='body2'>
                                        Qty : 1
                                    </Typography>
                                  </Grid>

                                 <Grid item xs={4} sm={2} md={2}>Tk.599</Grid>

                              {/* </Box> */}

                              </Grid>

                              
                          </Paper>
                      </Grid>                
                  </Grid>
                

            </Box>
         </Container>
       </>
    );
};

export default shippingDetails;
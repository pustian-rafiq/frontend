import { Box, Grid, Paper, Typography } from '@mui/material';
import { borderBottom, display, textAlign } from '@mui/system';
import React from 'react';
import Title from '../../components/Header/Title';

const purchaseReport = () => {
    let today = new Date().toLocaleDateString();

    return (
      <> 
        <Title> Purchase Report </Title>
          <Box style={{
              margin:'0 auto',
              display:'block'
          }}>
        
      
          <Box
            style={{ cursor: "move" }}
            
          >
            <Box>
              <Typography variant='h5' sx={{my:'15px',textShadow:'3px 3px 5px gray',textAlign:'center',letterSpacing:'1px'}}>SALES ORDER REPORT </Typography>
            </Box>

          </Box>

          {/* modal body  */}

            <Box>


              {/* Choose product */}
              <Box
                className="receipt_container"
                // id="receiptContent"
              //   ref={ref}

              sx={{
                  backgroundColor:'#fff',
                  marginBottom:'12px',
                  p:'16px',
                  textAlign:'center',

              }}
              >
                  <Box sx={{
                      border: '1px solid #000',
                      padding:'7px'
                  }}> 
                {/* Receipt section  */}
                <Box sx={{
                    border:'1px dashed'
                }}>
                  {/* shop name  */}
                  <Box sx={{
                      my:'7px'
                  }}>
                    <h6 style={{lineHeight:'19px'}}>
                      Shop Name: Ehsan Marketing Shop{" "}
                      
                    </h6>
                    <h6 style={{lineHeight:'19px'}}>
                      Address: Jamira,Puthia.Bogura{" "}
                      
                    </h6>
                    <h6 style={{lineHeight:'19px'}}>
                      Email:ehsan.marketing@gmail.com{" "}
                      
                    </h6>
                  </Box>
              
                </Box>

                {/* Terminal section  */}
                <Box 
                sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center',
                      py:'5px',
                      borderBottom:'1px dashed',
                      mt:'5px'

                  }}
                >
                  <Box
                  
                  sx={{
                      display:'flex',
                      justifyContent:'space-between'

                  }}
                  >
                    <p>Order No : 150132</p>
                  </Box>
                  
                  <Box sx={{mr:'5px'}}>
                    <p>Date : {today}</p>
                  </Box>
                </Box>

                {/* sales quantity section  */}
                <Box sx={{
                    borderBottom:'1px dashed',
                    py:'10px'
                }}>
                  <p>Reciept Amount Details</p>
                  
                  {/* <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                          <Box>
                            <p>
                              asdad
                            </p>
                          </Box>
                          <Box>
                            <p>12.52</p>
                          </Box>
                        </Box> */}

                </Box>

                {/* amount section  */}
                <Box className="amount dashed_border_top mt-1"
                sx={{
                    borderTop:'1px dashed',
                    mt:'5px',
                }}
                
                >
                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>Payment-Process</p>
                    </Box>
                    <Box>
                      <p>
                        125
                      </p>
                    </Box>
                  </Box>

                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>Quantity</p>
                    </Box>
                    <Box>
                      <p>000</p>
                    </Box>
                  </Box>

                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>
                          Vat_Price_Usd</p>
                    </Box>
                    <Box>
                      <p>
                        000
                      </p>
                    </Box>
                  </Box>

                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>Vat_Price</p>
                    </Box>
                    <Box>
                      <p>125.00</p>
                    </Box>
                  </Box>

                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>CommissionUsd</p>
                    </Box>
                    <Box>
                      <p>
                        102.255
                      </p>
                    </Box>
                  </Box>

                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>Commission</p>
                    </Box>
                    <Box>
                      <p>154.25</p>
                    </Box>
                  </Box>

                  <Box  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>DiscountUsd</p>
                    </Box>
                    <Box>
                      <p>
                        12.021
                      </p>
                    </Box>
                  </Box>

                  <Box sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}>
                    <Box>
                      <p>Discount</p>
                    </Box>
                    <Box>
                      <p>25.215</p>
                    </Box>
                  </Box>

                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      mt:'3px',
                      mb:'10px',
                  }}
                  >
                    <Box>
                      <p>OfferPrice_Usd</p>
                    </Box>
                    <Box>
                      <p>000</p>
                    </Box>
                  </Box>

                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      mt:'5px',
                      mt:'10px',
                      pb:'7px',
                      borderBottom:'1px dashed'
                  }}
                  >
                    <Box>
                      <p>OfferPrice</p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>


                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}
                  >
                    <Box>
                      <p style={{fontSize:'16px'}}><strong> Total Price </strong></p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>

                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}
                  >
                    <Box>
                      <p>Total_ShippingCost_Usd</p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>

                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}
                  >
                    <Box>
                      <p>TotalPrice_Usd</p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>

                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}
                  >
                    <Box>
                      <p>TotalPayable_Amt_Usd</p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>
                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}
                  >
                    <Box>
                      <p>TotalPayable_Amt</p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>
                                  <Box 
                  sx={{
                      display:'flex',
                      justifyContent:'space-between',
                      my:'5px'
                  }}
                  >
                    <Box>
                      <p>IsPaid</p>
                    </Box>
                    <Box>
                      <p>255.21</p>
                    </Box>
                  </Box>
          

                </Box>

                {/* thank you section  */}
                <Box 
                sx={{
                    borderTop:'1px dashed',
                    borderBottom:'1px dashed',
                    py:'6px'

                }}
                >
                  <p>Thank You</p>
                </Box>

                {/* Qr/Bar Code section  */}
                <Box 
                  sx={{
                    borderTop:'1px dashed',
                    borderBottom:'1px dashed',
                    py:'6px'

                  }}
                >
                  <p>Ehsan Marketing</p>
                </Box>
                </Box>

              </Box>
            </Box>

        </Box>
      </>

    );
};

export default purchaseReport;
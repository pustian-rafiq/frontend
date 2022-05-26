import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import styles from './Withdraw.module.css'
import { Button, Divider } from '@mui/material';
import Link from 'next/link';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TransactionForm = () => {
  return (
    <div className={styles.upperSection}>
      <form  >
        <Box sx={{ flexGrow: 1, maxWidth: '100%', }} >
          <Grid container spacing={5}>
            <Grid item md={12}  >
              <Item>
                <Grid container spacing={5} sx={{mt:0}}>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid item xs={12} md={6}  >
                    {/* <InputLabel style={{ textAlign: 'left' }} htmlFor="component-simple">Requisition*</InputLabel> */}
                    <TextField
                      fullWidth
                      size="small"
                      inputProps={
                        { readOnly: true, }
                      }
                      id="outlined-basic" label="Requisition*" variant="outlined"
                    />
                    <Grid item xs={12} md={4}>
                      <Link href='/'>
                        <Button variant="contained" className={styles.withdrawButton}>
                          Withdraw
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Item>

              {/* Bottom section */}

              <Item className={styles.upperSection}>
                <Grid container spacing={5} columnSpacing={2} className={styles.leftSection}>
                  <Grid item xs={12} md={5}  >
                    <h4>Withdraw Information:</h4>
                    <p>Available Amount Balance: $0.06</p>
                    <p>Pending Cashout Amount: $</p>
                    <p>Total Cashouted Amount: $</p>
                  </Grid>
                  <div className={styles.verticalDivider}></div>

                  <Grid item xs={12} md={6}  >
                    <h4>Last Cashout Information:</h4>
                    <p>Cashout Amount($) :</p>
                    <p>Cashout Tax Amount():</p>
                    <p>Total request cashout amount($):</p>
                  </Grid>
                </Grid>

                <Grid sx={{mb:10}} container spacing={5} columnSpacing={2} className={styles.leftSection}>
                  <Grid item xs={12} md={5}  >
                    <Item style={{textAlign:'left'}}>Purchase : $0.05016</Item>
                  </Grid>
                  <Grid item xs={12} md={6}  >
                    <Item style={{textAlign:'left'}}>Local Highest Purchase: $0.0</Item>
                  </Grid>
                  <Grid item xs={12} md={5}  >
                    <Item style={{textAlign:'left'}}>Reference: $0.00735</Item>
                  </Grid>
                  <Grid item xs={12} md={6}  >
                    <Item style={{textAlign:'left'}}>Reference: $0.0</Item>
                  </Grid>
                  <Grid item xs={12} md={5}  >
                    <Item style={{textAlign:'left'}}>Prantic: $0.000061</Item>
                  </Grid>
                  <Grid item xs={12} md={6}  >
                    <Item style={{textAlign:'left'}}>Local Highest Sale: $0.0</Item>
                  </Grid>
                  <Grid item xs={12} md={5}  >
                    <Item style={{textAlign:'left'}}>Middle: $0.0</Item>
                  </Grid>
                  <Grid item xs={12} md={6}  >
                    <Item style={{textAlign:'left'}}>Purchase percentage of total amount : 87.12719945806047%</Item>
                  </Grid>
                </Grid>

              </Item>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
export default TransactionForm

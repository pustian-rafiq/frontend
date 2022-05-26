import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from '../Commision.module.css'
 
const SendCommision = ()=> {
  const [searchText, setSearchText] = useState("")
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={7} >
          <div className={styles.searchTitle}>
            Search by CIN or Phone(without country code like 17XXXXXXXX) 
          </div>
         
          <div style={{ marginTop: '10px' }} className={styles.searchSection} >
                    <div className={styles.searchInput}>
                        <input type="text" placeholder='Ex.17xxxxxxxx or CIN'
                           onChange={(e)=> setSearchText(e.target.value)}
                            value={searchText}
                        />
                    </div>
                    <div className={styles.searchLabel}>
                        Search
                    </div>
                </div>
 
      
        </Grid>
      </Grid>
    </Box>
  );
}
export default SendCommision

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styles from "./AdminDashboard.module.css";
import ShowConsumerByCountry from "./ShowConsumerByCountry";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminDashboard = ({ details }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Grid item xs={12} md={12} sx={{ pt: 4, pb: 4 }}>
              <div className={styles.adminContent}>
                <h2>Consumers</h2>
                {
                  details?.consumersCountDetails[0]?.map((data,index) =>  
                    data?.total_consumer ? 
                        <p key={index}>Total consumer: {data?.total_consumer}</p>
                   : data?.total_master_consumer ?
                   <p key={index}>Master Consumer: {data?.total_master_consumer} </p>
                   :
                   <p key={index}>Normal Consumer: {data?.total_normal_consumer}</p>
                  )
                }

              </div>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Grid item xs={12} md={12} sx={{ pt: 4, pb: 4 }}>
              <div className={styles.adminContent}>
                <h2>Genderwise Count</h2>
                {
                  details?.consumersCountDetails[1]?.map((data,index) =>  
                    data?.Gender === "male" ? 
                        <p key={index}>Total Male consumer: {data?.Gender__count}</p>
                   : data?.Gender === "female" ?
                   <p key={index}>Total Female Consumer: {data?.Gender__count} </p>
                   :
                   <p key={index}>Total Others Consumer: {data?.Gender__count}</p>
                  )
                }

              </div>
            </Grid>
          </Item>
        </Grid>

        <Grid item xs={12}>

          <Grid item xs={12} md={12} sx={{ pt: 4, pb: 4 }}>
            <div className={styles.adminContent}>
              <ShowConsumerByCountry CountrywiseConsumer={details?.consumersCountDetails[2]} />
            </div>
          </Grid>

        </Grid>

      </Grid>
    </Box>
  );
};
export default AdminDashboard;

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const FullPageLoader = () => {
  return (
    <Box>
      <Container>
        <Skeleton variant="rectangular" width={`100%`} height={`10vh`} />
        <Grid container spacing={2} mt={0.3}>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width={`100%`} height={`30vh`} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" width={`100%`} height={`30vh`} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width={`100%`} height={`30vh`} />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0.3}> 
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width={`100%`} height={`25vh`} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width={`100%`} height={`25vh`} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width={`100%`} height={`25vh`} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="rectangular" width={`100%`} height={`25vh`} />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.3}>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" width={`100%`} height={`15vh`} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" width={`100%`} height={`15vh`} />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.3}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width={`100%`} height={`10vh`} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FullPageLoader;

import React from "react";

// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// our components
import LeftSidebar from "./LeftSidebar";
import Slider from "./Slider";
import RightSidebar from "./RightSidebar";

// css
import styles from "../../styles/HeroSection/HeroSection.module.css";
import Link from "next/link";

const HeroSection = ({category,searchConsumer,heroSliders,ehsanDetails,notice}) => {
  // console.log('notices',notice);
  return (
    <>
      <Box>
        <Container>
          {/* test slogan  */}
          <Box className={styles.right_to_Left_slogan}>
            <Typography className={styles.text} variant="caption" sx={{cursor:'pointer'}}>
              {notice?.data?.sliderNotifications?.edges?.map(notice=> notice?.node?.isActive===true &&
              <Link href={`sliderNotice/${notice?.node?.id}`} key={notice?.node?.id}> 
              <span >{notice?.node?.title} &nbsp; &nbsp; &nbsp;</span> 
              </Link>
              
              )}

             
            </Typography>
          </Box>

          {/* hero section  */}
          <Grid container sx={{height:{sm:'100%',md:'420px',lg:'420px'}, overflow: 'hidden'}}>
            <Grid item xs={12} sm={6} md={3} lg={3} sx={{
              display:{xs:'none',md:'block'}
            }} >
              <LeftSidebar category={category}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}  >
              <Slider heroSliders={heroSliders} />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} sx={{
             
            }}>
              <RightSidebar searchConsumer={searchConsumer} ehsanDetails={ehsanDetails}/>
            </Grid>

       

          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;

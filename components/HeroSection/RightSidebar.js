import React, { useRef, useState } from "react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

// css
import styles from "../../styles/HeroSection/HeroSection.module.css";

const RightSidebar = ({ searchConsumer, ehsanDetails }) => {
  return (
    <Box className={styles.right_sidebar}>
      <Box
        sx={{
          borderBottom: "1px dashed rgba(0, 0, 0, 0.25)",
          background: "var(--secondary)",
          padding: "5px",
        }}
      >
        {ehsanDetails?.data?.managementNode?.edges.map((ceo) => (
          <Grid container key={ceo?.node?.id}>
            <Grid
              item
              xs={4}
             
            >
              <img
                alt="Remy Sharp"

          // dynamically show data 

                // src={
                //   ceo?.node?.image
                //     ? ceo?.node?.image
                //     : "images/ehsanprofile.jpeg"
                // }


                // statically data show 
                src="images/ehsanprofile.jpeg"
                

               style={{width: '76px',height: '67px'}}
            
              />

              <Typography variant="caption" component="p" sx={{
                fontSize:'10px',
                ml:'4px'
              }}>
                {ceo?.node?.name}
              </Typography>

            </Grid>

            <Grid item xs={8} sx={{ textAlign: "left" }}>

              <Typography variant="caption" component="p" sx={{
                fontSize:'10px'
              }}>
                {ceo?.node?.designation1}
              </Typography>
              <Typography variant="caption" component="p" sx={{
                fontSize:'10px'
              }}>
                Ehsan Marketing System
              </Typography>
              <Typography variant="caption" component="p" sx={{
                fontSize:'10px'
              }}>
                {ceo?.node?.designation2},
              </Typography>
              <Typography variant="caption" component="p" sx={{
                fontSize:'10px'
              }}>
                {ceo?.node?.organization}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* slider  */}
      <Swiper
        direction={"vertical"}
        slidesPerView={4}
        spaceBetween={0}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          textAlign: "center",
          height: "450px",
        }}
      >
        {/* data?.allConsumerNode?.edges */}
        {searchConsumer?.data?.rightSliderConsumers?.edges.map((consumer) => (
          <SwiperSlide
            key={consumer?.node?.id}
            style={{
              textAlign: "center",
              padding: "5px",
              minHeight: "90px",
              background: "var(--secondary)",
              borderBottom: "0.12rem solid #ffffff",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={consumer?.node?.photo}
                  sx={{
                    width: 50,
                    height: 50,
                    border: "2px solid var(--secondary)",
                  }}
                />
              </Grid>

              <Grid item xs={8} sx={{ textAlign: "left" }}>
                <Typography variant="caption" component="p">
                  {consumer?.node?.user?.firstName}{" "}
                  {consumer?.node?.user?.lastName}
                </Typography>
                <Typography variant="caption" component="p">
                  {consumer?.node?.username}
                </Typography>
                <Typography variant="caption" component="p">
                  {consumer?.node?.isMaster === true
                    ? "Master Consumer"
                    : "Consumer"}
                </Typography>
                <Typography variant="caption" component="p">
                  {consumer?.node?.country?.name}
                </Typography>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RightSidebar;

import React, { useState } from "react";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";



const Reviews = ({comments}) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--primary)",
        margin: "40px 0px",
        padding: "40px 0px",
      }}
      id="mmm"
    >
      <Container>

        {/* swipper  */}
        <Box>
          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            style={{
              width: "100%",
              position: "relative",
              minHeight: "150px",
              marginTop: "30px",
              textAlign: "center",
            }}
            //for responsive breakpoint

            breakpoints={{
              // when window width is >= 400px
              400: {
                slidesPerView: 1,
              },
              // when window width is >= 600px
              600: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              // when window width is >= 640px
              800: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
          {comments?.data?.siteComments?.edges?.map((comment) => (
              comment?.node?.isActive ===true &&
              <SwiperSlide
                key={comment?.node?.id}
                style={{
                  width: "100%",
                  minHeight: "120px",
                  borderRadius: "15px",
                  padding: "20px",
                  backgroundColor: "var(--white)",
                }}
              >
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: -6,
                    zIndex: 100,
                    fontSize: "30px",
                    color: "var(--black)",
                  }}
                />
               
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      // display: "flex",
                      // justifyContent: "center",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={comment?.node?.image}
                      sx={{
                        width: { xs: "40", sm: "50", md: "60px", lg: "60px" },
                        margin:'0 auto',
                        height:{ xs: "40", sm: "50", md: "60px", lg: "60px" },
                        borderRadius:'50%',
                        border:'1px solid #f2f2f2',
                      
                      }}
                    />
                    
                    <Typography variant="body2" fontSize="small"
                    sx={{mt:'4px',fontWeight:'bold',textTransform:'capitalize'}}>{comment?.node?.designation}</Typography>


                    {/* <img src={comment?.node?.image} 
                    style={{

                      height:'55px',
                      width:'55px',
                      borderRadius:'50%'

                    }} alt="user-photo" /> */}
                  </Grid>

                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">
                      ----- {comment?.node?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ typography: { sm: "caption", xs: "caption" } }}
                    >
                      {comment?.node?.comment.slice(0,80)}
                    </Typography>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;

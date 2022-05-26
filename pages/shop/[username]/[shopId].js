import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Rating, Skeleton, Typography } from "@mui/material";

//next 
import Image from "next/image";
import { useRouter } from "next/router";

// swiper

import { Autoplay, Pagination, Navigation, EffectFade, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Title from "../../../components/Header/Title";
 
// utils
import getCookie from "../../../utils/getCookie";
import useShopDetails from "../../../apolloClient/queries/ConsumerDashboard/shop/ShopDetails";

// getting the values of local storage
const getDatafromLS = () => {
  if (typeof window !== "undefined") {
    var data = localStorage.getItem("shopId");
  }

  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};


const ShopPage = ({ token }) => {
  const [shopId, setShopId] = useState(getDatafromLS())
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useShopDetails(shopId, token)

  // saving shop id to local storage
  useEffect(() => {
    if (id) {
      localStorage.setItem("shopId", JSON.stringify(id));
    }
  }, []);

//Loading animation
  if (loading) {
    return <div>
      <Grid container spacing={1}>
        <Grid item md={3} sx={{marginLeft:'30px',marginTop:'30px', textAlign:'center',background:'#f7f7f7'}}>
          <Skeleton variant="text" sx={{textAlign:'center'}} width={220} height={40} />
          <Skeleton variant="rectangular"  width={100} height={100} />
          <Skeleton variant="rectangular" sx={{marginTop:'10px'}} width={230} height={418} />
        </Grid>
        <Grid item md={8} sx={{marginTop:'30px'}}>
          <Skeleton variant="rectangular" width={800} height={400} />
        </Grid>
      </Grid>
    </div>
  }

  return (
    <>
      <Title>{data?.shop?.name} </Title>
      <Container sx={{ my: "30px", position: "relative" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.05)", py: "15px" }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 4 }}>
                  {data?.shop?.name}
                </Typography>
                <Image
                  src={data?.shop?.logo ? data?.shop?.logo : "/images/wearhouse.jpeg"}
                  alt="ehsan logo"
                  height={70}
                  width={70}
                />

              </Box>

              <Box sx={{ textAlign: "center", mt: "18px" }}>
                <Typography variant="body1">
                  <Rating
                    name="half-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    size="large"
                  />
                </Typography>
              </Box>
              <Box sx={{ mt: "18px", mb: 2 }}>
                <Typography variant="body1" sx={{ py: 1, textAlign: 'center', fontWeight: '400', letterSpacing: '1px', }}>Address:</Typography>
              </Box>
              <Box sx={{ ml: 4, mt: "18px", mb: 4 }}>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }}>Continent: {data?.shop?.continent?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }}>Country: {data?.shop?.country?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }}>Division/State: {data?.shop?.divisionOrState?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }}>District/City: {data?.shop?.districtOrCity?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }}>Police Station: {data?.shop?.policeStation?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }}>  Sub-District: {data?.shop?.subDistrict?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Road/Street No: {data?.shop?.roadOrStreetNo?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Post Office: {data?.shop?.postoffice?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Municipality: {data?.shop?.municipality?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Union: {data?.shop?.union?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Word No: {data?.shop?.wordNo?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Village: {data?.shop?.village?.name}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Mahalla: {data?.shop?.mahalla}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Block: {data?.shop?.block}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >Holding No: {data?.shop?.holdingNo}</Typography>
                <Typography variant="body2" sx={{ py: 1, width: "218px", borderBottom: '1px solid #ddd' }} >House: {data?.shop?.house}</Typography>
              </Box>
            </Box>
          </Grid>


          <Grid item xs={12} sm={12} md={9} sx={{ zIndex: "-55" }}>
            <Swiper

              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Autoplay, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}

            >
              <SwiperSlide
                style={{
                  width: "100%",
                  height: "350px",
                  textAlign: "center",
                }}

              >
                <Image
                  src={data?.shop?.shopImage ? data?.shop?.shopImage : "/images/wearhouse.jpeg"}
                  alt="eshan_marketing_slider"
                  layout="fill"
                />
              </SwiperSlide>

              <SwiperSlide
                style={{
                  width: "100%",
                  height: "350px",
                  textAlign: "center",
                }}
              >
                <Image
                  src={data?.shop?.sliderImage1 ? data?.shop?.sliderImage1 : "/images/wearhouse.jpeg"}
                  alt="eshan_marketing_slider"
                  layout="fill"
                //  sx={{}}
                />
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100%",
                  height: "350px",
                  textAlign: "center",
                }}
              >
                <Image
                  src={data?.shop?.sliderImage2 ? data?.shop?.sliderImage2 : "/images/wearhouse.jpeg"}
                  alt="eshan_marketing_slider"
                  layout="fill"
                //  sx={{}}
                />
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100%",
                  height: "350px",
                  textAlign: "center",
                }}
              >
                <Image
                  src={data?.shop?.sliderImage3 ? data?.shop?.sliderImage3 : "/images/wearhouse.jpeg"}
                  alt="eshan_marketing_slider"
                  layout="fill"
                //  sx={{}}
                />
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100%",
                  height: "350px",
                  textAlign: "center",
                }}
              >
                <Image
                  src={data?.shop?.sliderImage4 ? data?.shop?.sliderImage4 : "/images/wearhouse.jpeg"}
                  alt="eshan_marketing_slider"
                  layout="fill"
                //  sx={{}}
                />
              </SwiperSlide>
            </Swiper>

            {/* <Slider /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

ShopPage.getInitialProps = async (appContext) => {
  const isInitial = "isInitial";
  const getSessionCookie = getCookie(appContext, isInitial);

  // // varify token and redirect
  // if (getSessionCookie == null) {
  //   if (appContext.res) {
  //     appContext.res.writeHead(302, {
  //       Location: "/login",
  //     });

  //     appContext.res.end();
  //   } else {
  //     Router.push("/login");
  //   }
  // } else {
  //   const validToken = await useVarifyTokenMutation(getSessionCookie);

  //   if (
  //     validToken.data.verifyToken.payload == null &&
  //     !validToken.data.verifyToken.success
  //   ) {
  //     if (appContext.res) {
  //       appContext.res.writeHead(302, {
  //         Location: "/login",
  //       });

  //       appContext.res.end();
  //     } else {
  //       Router.push("/login");
  //     }
  //   }
  // }

  return {
    token: getSessionCookie,
  };
};

export default ShopPage;

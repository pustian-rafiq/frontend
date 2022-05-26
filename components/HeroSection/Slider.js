import React, { useRef, useState } from "react";
import Image from "next/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// mui components
import Box from "@mui/material/Box";

// css
import styles from "../../styles/HeroSection/HeroSection.module.css";

const Slider = ({ heroSliders }) => {
  return (
    <Box className={styles.slider}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {heroSliders?.data?.sliders?.edges?.map(
          (slider) =>
            slider?.node?.isActive && (
              <SwiperSlide
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
                className={styles.slider_img}
                key={slider?.node?.id}
              >
                <Image
                  src={slider?.node?.image ? slider?.node?.image : '/images/slider/slider4.png' }
                  alt="eshan_marketing_slider"
                  layout="fill"
                 
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </Box>
  );
};

export default Slider;

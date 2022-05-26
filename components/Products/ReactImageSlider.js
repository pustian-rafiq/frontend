import React, { useEffect } from "react";
import SliderImage from "react-zoom-slider";
import Box from "@mui/material/Box";

// css
import styles from "../../styles/Products/Products.module.css";

const reactImageSlider = ({
  productImage,
  productSlider1,
  productSlider2,
  productSlider3,
  productSlider4,
}) => {
  useEffect(() => {
    // get main react-slider-zoom container
    let customizeSlider = document.querySelector(
      "#reactZoomSliderCustomization > .react-slider"
    );

    if (customizeSlider) {
      // get zoomArea element
      let zoomArea = document.querySelector(
        "#reactZoomSliderCustomization > .react-slider > .react-slider__container > .react-slider__areaZoom"
      );

      // get lens image element
      let lens = document.querySelector(
        "#reactZoomSliderCustomization > .react-slider > .react-slider__container > .react-slider__areaZoom > .react-slider__lens"
      );

      // get main image element
      let mainPicture = document.querySelector(
        "#reactZoomSliderCustomization > .react-slider > .react-slider__container > .react-slider__areaZoom > .react-slider__picture"
      );

      // get zoom image element
      let zoomImage = document.querySelector(
        "#reactZoomSliderCustomization > .react-slider > .react-slider__container > .react-slider__areaZoom > .react-slider__imgZoom"
      );

      // get multiple small image element
      let customizeSlider_ul = document.querySelectorAll(
        "#reactZoomSliderCustomization > .react-slider > .react-slider__ul > li"
      );

      // customize zoom area
      if (zoomArea) {
        zoomArea.style.width = "100%";
        zoomArea.style.height = "350px";
        zoomArea.style.position = "relative";
        zoomArea.style.boxSizing = "border-box";
      }

      // customize lens
      if (lens) {
        lens.style.width = "100px";
        lens.style.height = "100px";
        lens.style.position = "absolute";
      }

      // customize main image
      if (mainPicture) {
        mainPicture.classList.add(`${styles.zoomArea_main_picture}`);
        mainPicture.firstElementChild.style.maxWidth = "100%";
        mainPicture.firstElementChild.style.height = "100%";
        mainPicture.firstElementChild.style.objectFit = "contain";
      }

      // customize zoom image
      if (zoomImage) {
        zoomImage.classList.add(`${styles.zoom__img__derection}`);
      }

      // customize multiple small image
      if (customizeSlider_ul) {
        for (let node of customizeSlider_ul) {
          node.firstElementChild.style.width = "50px";
          node.firstElementChild.style.height = "50px";
        }
      }

      // move handler
      function mouseMoveHandler() {
        let bounds = mainPicture.getBoundingClientRect();
        let event = window.event;

        let x = event.pageX - bounds.left;
        let y = event.pageY - bounds.top;

        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        let positionLeft = x - lens.offsetWidth;
        let positionTop = y - lens.offsetHeight;

        if (positionLeft < 0) {
          positionLeft = 0;
        }

        if (positionTop < 0) {
          positionTop = 0;
        }

        if (positionLeft > mainPicture.clientWidth) {
          positionLeft = mainPicture.clientWidth - lens.clientWidth;
        }

        if (positionTop > mainPicture.clientHeight) {
          positionTop = mainPicture.clientHeight - lens.clientHeight;
        }

        lens.style.left = positionLeft + "px";
        lens.style.top = positionTop + "px";
      }

      // add mouse move handler
      lens.addEventListener("mousemove", mouseMoveHandler);
      mainPicture.addEventListener("mousemove", mouseMoveHandler);
    }
  }, []);

  const newData = [];

  if (productImage !== "") {
    newData.push({ image: `${productImage}` });
  }

  if (productSlider1 !== "") {
    newData.push({ image: `${productSlider1}` });
  }

  if (productSlider2 !== "") {
    newData.push({ image: `${productSlider2}` });
  }

  if (productSlider3 !== "") {
    newData.push({ image: `${productSlider3}` });
  }

  if (productSlider4 !== "") {
    newData.push({ image: `${productSlider4}` });
  }

  // if (newData.length == 1) {
  //   newData.push({ image: `${productImage}` });
  // }

  return (
    <Box id="reactZoomSliderCustomization">
      <SliderImage data={newData} width="100%" direction="right" />
    </Box>
  );
};

export default reactImageSlider;

import React from "react";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Map = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "310px",
        backgroundColor: "var(--white)",
        margin: "40px 0px",
      }}
    >
      <Container>
        <Box
          sx={{
            border: "1px solid cyan",
            height: "315px",
            padding: "5px",
          }}
        >
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28964.48441623762!2d89.37144319999999!3d24.844697599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1646478277068!5m2!1sen!2sbd"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>
      </Container>

    </Box>
  );
};

export default Map;

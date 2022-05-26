import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/svg/loginbg.svg)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            padding: "20px",
            border: "1px solid palegreen",
          }}
          borderRadius={7}
          color={"white"}
          textAlign={"center"}
        >
          Opps! 404 Page Not Found{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;

PageNotFound.getLayout = function pageLayout(page) {
  return <>{page}</>;
};

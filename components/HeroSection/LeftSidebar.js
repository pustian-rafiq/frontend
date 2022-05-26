import React from "react";
import Tippy from "@tippyjs/react";
// import "tippy.js/animations/shift-toward.css";
import "tippy.js/dist/tippy.css";

// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

// icons
import CircularProgress from "@mui/material/CircularProgress";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MenuIcon from "@mui/icons-material/Menu";

// css
import styles from "../../styles/HeroSection/HeroSection.module.css";
import styles2 from "../../styles/HeroSection/megamenu.module.css";

import Megamenu from "./Megamenu";
import Link from "next/link";

const LeftSidebar = ({ category }) => {
  //for data loading
  if (category && category.loading)
    return (
      <img
        src="/images/spinner.gif"
        alt=""
        style={{
          margin: "0 auto",
          display: "block",
        }}
      />
    );

  return (
    <>
      <Box className={styles.left_sidebar}>
        <Box textAlign="center">
          <IconButton>
            <MenuIcon />
            <Typography
              ml={1}
              variant="span"
              component="span"
              sx={{ fontSize: "17px", color: "rgb(34, 34, 34)" }}
            >
              Category
            </Typography>
          </IconButton>
        </Box>

        {/* show data from the all category methods */}

        {category?.data?.categories?.edges?.map((sidebar) => (
          <Box key={sidebar?.node?.id} sx={{ paddingLeft: "10px" }}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Link href={`category/${sidebar?.node?.name}`}> 
                <Typography
                  pt={1}
                  sx={{ fontSize: "14px", display: "flex", color: "gray" }}
                  className={styles2.megamenuContainer}
                  component="div"
                >
                  {sidebar?.node?.image ? (
                    <img
                      src={sidebar?.node?.image}
                      alt=""
                      height="20px"
                      width="20px"
                      style={{
                        borderRadius: "50%",
                        border: "0px",
                      }}
                    />
                  ) : (
                    <img
                      src="https://img.freepik.com/free-psd/plastic-cosmetic-jar-mockup_358694-3413.jpg?t=st=1649484363~exp=1649484963~hmac=4be127eeab02b2e79fe598e8d29bb7d98408b49a9aeae67313fd905171a5bfee&w=740"
                      alt="freepik"
                      height="20px"
                      width="20px"
                      style={{
                        borderRadius: "50%",
                        border: "0px",
                      }}
                    />
                  )}

                  <Megamenu sidebar={sidebar} key={sidebar?.node?.id} />
                  <NavigateNextIcon style={{ marginLeft: "25px" }} />
                </Typography>
             </Link>

              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default LeftSidebar;

import React from "react";
import Link from "next/link";
import { useContext, useEffect } from 'react'
// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";

// css
import styles from "../../styles/Header/Header.module.css";

const HeaderTop = () => {
  //select a language 

      useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, [])

    const googleTranslateElementInit = () => {

        new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            // includedLanguages : "en,ms,ta,zh-CN", // include this for selected languages
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element');

    }

  return (

  


    <Box className={styles.header_top}>
      <Container>
        <Grid container>
          {/* left side  */}
          <Grid item container sm={12} md={6} alignItems="center" px={1}>
            <Grid item sm={12} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: "10px", md: "12px" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                It is the only company in the world run by the brand new Ehsan
                Marketing System.
              </Typography>
            </Grid>
          </Grid>

          {/* right side  */}
          <Grid
            item
            container
            sm={12}
            md={6}
            alignItems="center"
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            {/* social network  */}
            <Grid item xs="auto">
              <Link href="https://www.ehsansoftware.com/">
                <a target="_blank"> 
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" component="div">
                    <LanguageIcon></LanguageIcon>
                  </Typography>

                  <Typography
                    sx={{ marginLeft: "5px", marginTop: "5px" }}
                    variant="caption"
                    component="div"
                  >
                    World Ehsan Socail Network
                  </Typography>
                </Box>
                 </a>
              </Link>
            </Grid>

            {/* email  */}
            <Grid item xs="auto" ml={2}>
              <Link href="https://mail.worldehsan.com/mail/" >
                <a target="_blank"> 
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" component="div">
                    <MailOutlineIcon></MailOutlineIcon>
                  </Typography>

               
                    <Typography
                      sx={{ marginLeft: "5px", marginTop: "4px" }}
                      variant="caption"
                      component="div"
                    > 
                    Email
                    </Typography>

                </Box>
                </a>
              </Link>
            </Grid>

            {/* language  */}
            <Grid item xs="auto" textAlign={{ xs: "left", md: "right" }}>
              <Button>
                <Box id="google_translate_element"></Box>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeaderTop;

import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import footerTop from "../../styles/footerTop.module.css";

const Footertop = () => {
  return (
    <Box sx={{margin:'10px 0px 15px 0px'}}>
      <hr style={{ border: "3px solid #45b9e0",marginBottom:'10px' }} className={footerTop.responsive_ftop_hr}/>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* details for consumer  */}

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                pb: "5px",
                borderBottom: "1px solid #45b9e0",
              }}
              className={footerTop.responsive_ftop}
            >
              Consumer
            </Typography>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0px",
              }}
            >
              <li>
                {" "}
               
                 <Typography variant="body2"  className={footerTop.listText}>Consumer Id: 526874</Typography>
                 <Typography variant="body2" className={footerTop.listText}>Consumer Name: Bulbul Khan</Typography>
                 <Typography variant="body2" className={footerTop.listText}>Consumer Indentity: Root</Typography>
               
              </li>

             
              </ul>
          </Grid>

          {/* details for content  */}

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                borderBottom: "1px solid #45b9e0",
                pb: "7px",
              }}
              className={footerTop.responsive_ftop}
            >
              Content
            </Typography>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0px",
              }}
            >
              <li>
                {" "}
                <Link href="/others/termsCondition">
                  <a className={footerTop.listText}>Terms & Condition</a>
                </Link>
              </li>

              <li>
                {" "}
                <Link href="/others/goals">
                  <a className={footerTop.listText}>Our Goals</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/others/marketing_policy">
                  <a className={footerTop.listText}>Our Marketing Policy</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/others/commision">
                  <a className={footerTop.listText}>Commission Info</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/others/incentiveArchivers">
                  <a className={footerTop.listText}>Incentive & Achiver's</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/others/faq">
                  <a className={footerTop.listText}>FAQ Questions</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/others/video">
                  <a className={footerTop.listText}>Ehsan Videos</a>
                </Link>
              </li>            
                <li>
                {" "}
                <Link href="/others/comments">
                  <a className={footerTop.listText}>Comments</a>
                </Link>
              </li>
              
              <li>
                {" "}
                <Link href="/contact">
                  <a className={footerTop.listText}>Contact Us</a>
                </Link>
              </li>
            </ul>
          </Grid>

          {/* details for our websites  here */}

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                borderBottom: "1px solid #45b9e0",
                pb: "7px",
                
              }}

         
              className={footerTop.responsive_ftop}

              
            >
              Sister Concern
            </Typography>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0px",
              }}
            >
              <li>
                {" "}
                <Link href="https://ehsanmarketing.com/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Map
                  </a>
                </Link>
              </li>

              <li>
                {" "}
                <Link href="https://ehsanblog.com/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Blog
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://ehsannews.com/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan News
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://www.ehsansoftware.com/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Software
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://ehsanmarketing.com/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Marketing
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://mail.worldehsan.com/mail/">
                  <a className={footerTop.listText} target="_blank">
                    World Ehsan Email
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Live (Upcoming…)
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan RTC (Upcoming…)
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Calling (Upcoming…)
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan Messenger (Upcoming…)
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    World Ehsan Social site (Upcoming…)
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="http://www.edubd.app">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan International Education Software
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    World's Largest Free Online Marketplace
                  </a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/upcommingWebsite/">
                  <a className={footerTop.listText} target="_blank">
                    Ehsan International Multi-Inventory Software (Upcoming…)
                  </a>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footertop;

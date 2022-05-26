import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import FooterTop from "./Footertop";

import footer_styles from "../../styles/footer.module.css";

const Footer = () => {
  return (
    <>
      {/* footer top  */}
      <FooterTop />

      {/* main footer  */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          backgroundColor: "#45b9e0",
          color: "rgb(207, 201, 201)",
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "13px", sm: "14px", md: "17px" } }}
          >
            &copy; 2012 - {new Date().getFullYear()}
            <Link
              href="https://ehsanmarketing.com/"
              sx={{ textDecoration: "none", color: "#fff" }}
              target="_blank"
              className={footer_styles.footer_Link_Hover}
            >
              {" "}
              Ehsan Marketing
            </Link>{" "}
            Developed by
            <Link
              href="https://www.ehsansoftware.com/"
              sx={{ textDecoration: "none", color: "#fff" }}
              target="_blank"
              className={footer_styles.footer_Link_Hover}
            >
              Ehsan Software
            </Link>
            (A sister concern of
            <Link
              href="https://worldehsan.org/"
              sx={{ textDecoration: "none", color: "#fff" }}
              target="_blank"
              className={footer_styles.footer_Link_Hover}
            >
              {" "}
              Ehsan Group
            </Link>{" "}
            ) All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;

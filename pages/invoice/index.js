import React, { useCallback, useContext } from "react";
import Script from "next/script";

// mui component
import { Box, Button, Container, Typography } from "@mui/material";

import { bkashPaymentHandler } from "../../bkash/bkashScript";
import useCreatePaymentMutation from "../../apolloClient/mutation/payment/useCreatePaymentMutation";
import { GlobalContext } from "../_app.js";
import Title from "../../components/Header/Title";

const Invoice = () => {
  const { token } = useContext(GlobalContext);

  return (
    <>
      <Title>Invoice Details</Title>
      <Script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"
      ></Script>

      {/* <Script src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js" onLoad={() => {console.log("load after load");
          bkashPaymentHandler(token, "T3JkZXJOb2RlOjQz");
                }}
      ></Script> */}

      <Script
        // Local
        // src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"

        // Production
        src="https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout.js"
        onLoad={() => {
          console.log("load after load");
          bkashPaymentHandler(token, "T3JkZXJOb2RlOjYw", "10.00");
        }}
      ></Script>

      <Box>
        <Container>
          <Box
            sx={{
              mt: "20px",
              p: "20px",
              height: "300px",
              border: "2px solid salmon",
            }}
          >
            <Typography>Invoice Page</Typography>
            {/* <Button id="bKash_button" variant="outlined">
              Pay With bKash
            </Button> */}
            <Button variant="outlined">Pay With bKash</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Invoice;

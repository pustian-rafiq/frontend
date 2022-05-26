import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// apollo client
import useHistoryGallary from "../../apolloClient/queries/historicalGallary/historicalGalleryQuery";
import { GlobalContext } from "../../pages/_app";

const HistoricalSlider = () => {
  const globalData = useContext(GlobalContext);
  const { loading, error, data } = useHistoryGallary(globalData.token);

  if (loading && data == undefined) {
    return (
      <Container>
        <Typography sx={{ textAlign: "center" }}>
          <img src="/images/loading.gif" alt="historicalSlider" />{" "}
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      <Container>
        {!loading && data?.me?.consumers?.country ? (
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontSize: "25px",
              my: "30px",
              textAlign: "center",
              letterSpacing: "2px",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            HISTORICAL PLACE
          </Typography>
        ) : (
          " "
        )}

        <Grid container spacing={2} className="historicalGallery">
          {data?.me?.consumers?.country?.historicalsliders?.edges?.map(
            (history) =>
              history?.node?.isActive === true && (
                <Grid item xs={12} sm={6} md={3} lg={4} key={history?.node?.id}>
                  <a
                    href={history?.node?.youtubeLink}
                    target="_blank"
                    title={history?.node?.title}
                  >
                    <img
                      src={history?.node?.image}
                      width="370"
                      height="250"
                      className="history_image_small_devices"
                    />
                  </a>
                </Grid>
              )
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HistoricalSlider;

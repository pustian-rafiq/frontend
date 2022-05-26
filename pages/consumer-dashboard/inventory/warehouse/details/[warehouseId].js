import { useRouter } from "next/router";
import React from "react";
import useWarehouseDetails from "../../../../../apolloClient/queries/ConsumerDashboard/wearhouse/WarehouseDetails";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const WarehouseDetails = () => {
  const router = useRouter();
  const { warehouseId } = router.query;
  const { data, error, loading } = useWarehouseDetails(warehouseId);

  console.log("Warehouse Data", data);
  console.log("warehouseId ", warehouseId);
  if (loading) {
    return <div> loading.......</div>;
  }
  return (
    <>
      <Box>
        <Typography
          sx={{
            pb: 2,
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            color: "#777779",
          }}
        >
          Warehouse Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Grid container spacing={0}>
            <Grid item md={12}>
              <Item sx={{ mx: { xs: "0px", sm: "20px", md: "30px" } }}>
                <Grid container spacing={4} sx={{ py: 5 }}>
                  <Grid item sm={4} md={4}>
                    <img
                      src={data?.warehouse?.image}
                      width="150"
                      height="150"
                      alt="Warehouse Photo"
                    />
                  </Grid>
                  <Grid item sm={8} md={8}>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            Name
                          </Typography>
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={8}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            {data?.warehouse?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            Description
                          </Typography>
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={8}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            {data?.warehouse?.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            Country
                          </Typography>
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={8}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            {data?.warehouse?.country?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            State/Division
                          </Typography>
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={8}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            {data?.warehouse?.divisionOrState?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} md={3}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            District/City
                          </Typography>
                        </Grid>
                        <Grid item xs={1} md={1}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={8}>
                          <Typography
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            }}
                          >
                            {data?.warehouse?.districtOrCity?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default withConsumerAuth(WarehouseDetails);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  if (getSessionCookie === null || !getUser || getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const EditDesignation = ({ token, currentUser }) => {
  return (
    <>
      <div className="paymentTitle">
        <span>Update Designation</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form>
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item md={12}>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={2} columnSpacing={3}>
                    <Grid item xs={12} sm={12} md={3}></Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={2} columnSpacing={6}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Code*"
                            id="fullWidth"
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Description*"
                            id="outlined-textarea"
                            multiline
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Button
                            component="span"
                            sx={{
                              width: "150px",
                              background: "#20C20C",
                              color: "white",
                              textTransform: "capitalize",
                              display: "block",
                              textAlign: "center",
                              ":hover": {
                                background: "#0B4A02",
                              },
                            }}
                          >
                            Update Designation
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};
export default withAdminAuth(EditDesignation);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  if (getSessionCookie === null || !getUser || !getUser.isStaff) {
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

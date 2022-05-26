import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const EditCompany = ({ token, currentUser }) => {
  // Image Preview code
  const [logoPreview, setLogoPreview] = useState({ file: null });
  const [signPreview, setSignPreview] = useState({ file: null });
  const logoChangeHandler = (event) => {
    console.log("logo");
    // setPicturePath(event.target.files[0]);
    setLogoPreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };
  const signChangeHandler = (event) => {
    // setPicturePath(event.target.files[0]);
    console.log("Sign");
    setSignPreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  return (
    <>
      <div className="paymentTitle">
        <span>Add New Company</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form>
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item md={12}>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={2}>
                    {/* Left Column of the form*/}
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Name*"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Code*"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Website Link"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Id card request txt"
                        id="outlined-textarea"
                        multiline
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Email*"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Mobile*"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Address *"
                        id="outlined-textarea"
                        multiline
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                      <div
                        style={{
                          border: "1px solid #000",
                          height: "100px",
                          width: "100px",
                          marginBottom: "10px",
                        }}
                      >
                        {logoPreview.file ? (
                          <img
                            src={logoPreview.file}
                            width="100"
                            height="100"
                          />
                        ) : (
                          <img
                            src="/images/profile-picture.jpg"
                            width="100"
                            height="100"
                          />
                        )}
                      </div>
                      <label htmlFor="logo-button-file">
                        <Input
                          accept="image/*"
                          onChange={logoChangeHandler}
                          id="logo-button-file"
                          multiple
                          type="file"
                        />
                        <Button
                          component="span"
                          sx={{
                            background: "#152313",
                            color: "white",
                            textTransform: "capitalize",
                            ":hover": {
                              background: "#42563F",
                            },
                          }}
                        >
                          Upload Logo*
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <div
                        style={{
                          border: "1px solid #000",
                          height: "100px",
                          width: "100px",
                          marginBottom: "10px",
                        }}
                      >
                        {signPreview.file ? (
                          <img
                            src={signPreview.file}
                            width="100"
                            height="100"
                          />
                        ) : (
                          <img
                            src="/images/profile-picture.jpg"
                            width="100"
                            height="100"
                          />
                        )}
                      </div>
                      <label htmlFor="sign-button-file">
                        <Input
                          accept="image/*"
                          onChange={signChangeHandler}
                          id="sign-button-file"
                          multiple
                          type="file"
                        />
                        <Button
                          component="span"
                          sx={{
                            background: "#152313",
                            color: "white",
                            textTransform: "capitalize",
                            width: "100px",
                            ":hover": {
                              background: "#42563F",
                            },
                          }}
                        >
                          CEO Sign*
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Button
                        component="span"
                        sx={{
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
                        Save Company
                      </Button>
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

export default withAdminAuth(EditCompany);

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

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "../../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";
import TextField from "@mui/material/TextField";
//import InputLabel from '@mui/material/InputLabel';
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

const EditIncentive = ({ token, currentUser }) => {
  // Image Preview code
  const [imagePreview, setImagePreview] = useState({ file: null });
  const handleChange = (event) => {
    // setPicturePath(event.target.files[0]);
    console.log(event.target.files[0]);
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  return (
    <>
      <div className="paymentTitle">
        <span>Update Incentives</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form className={styles.columnSpace}>
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={4}>
              <Grid item md={12}>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={3}>
                    {/* Left Column of the form*/}
                    <Grid item xs={12} md={4} className={styles.rowSpace}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                        id="fullWidth"
                        label="Name"
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className={styles.rowSpace}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                        id="fullWidth"
                        label="Icon"
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className={styles.rowSpace}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                        id="fullWidth"
                        label="Number"
                      />
                    </Grid>
                    <Grid item xs={12} md={8} className={styles.rowSpace}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        inputProps={{ readOnly: true }}
                        id="fullWidth"
                        label="Note"
                      />
                    </Grid>

                    <Grid item xs={12} md={2} className={styles.rowSpace}>
                      {/* <InputLabel htmlFor="component-simple">Profile Photo</InputLabel> */}
                      <div
                        style={{
                          border: "1px solid #000",
                          height: "80px",
                          width: "80px",
                          marginBottom: "10px",
                        }}
                      >
                        {imagePreview.file ? (
                          <img
                            src={imagePreview.file}
                            width="80"
                            height="80"
                          />
                        ) : (
                          <img
                            src="/images/profile-picture.jpg"
                            width="80"
                            height="80"
                          />
                        )}
                      </div>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          onChange={handleChange}
                          id="contained-button-file"
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
                          Upload Logo
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} md={2} className={styles.rowSpace}>
                      <Button
                        component="span"
                        sx={{
                          background: "#20C20C",
                          color: "white",
                          textTransform: "capitalize",
                          ":hover": {
                            background: "#0B4A02",
                          },
                        }}
                      >
                        Update Incentives
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
export default withAdminAuth(EditIncentive);

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

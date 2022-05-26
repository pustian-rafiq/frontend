import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import getCurrentUser from "../../../utils/getCurrentUser";
import getCookie from "../../../utils/getCookie";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const AddDesignation = ({ token, currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="paymentTitle">
        <span>Add New Designation</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form className={styles.columnSpace} onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("code", { required: true })}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Description*"
                            id="outlined-textarea"
                            multiline
                            {...register("description", { required: true })}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            sx={{
                              width: "140px",
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
                            Save Designation
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
export default withAdminAuth(AddDesignation);

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

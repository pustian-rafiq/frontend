import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
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

const UpdateTax = ({ token, currentUser }) => {
  return (
    <>
      <div className="paymentTitle">
        <span>Update Tax</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form>
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={4}>
              <Grid item md={12}>
                <Item style={{ padding: "30px 20px" }}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      background: "#0DA8EE",
                      width: "80px",
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      borderRadius: "5px",
                      cursor: "pointer",
                      py: 1,
                    }}
                  >
                    <ArrowBackIcon />
                    <Link href="/admin-dashboard/tax/tax-list/">Back</Link>
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item md={3}></Grid>
                    <Grid item md={6}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Name of field*"
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={employeeList}
                            getOptionLabel={(option) => option.name}
                            //defaultValue={employeeList[0]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Country *"
                                placeholder="Search by country"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Percentage*"
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
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
                            Save Tax
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={3}></Grid>
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
export default withAdminAuth(UpdateTax);

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

const employeeList = [
  { name: "Md. Rafiqul Islam" },
  { name: "Md. Mim Islam" },
  { name: "Md. Ariful Islam" },
  { name: "Md. Munna" },
  { name: "Md. Nazmul Hossain" },
  { name: "Md. Subho" },
];

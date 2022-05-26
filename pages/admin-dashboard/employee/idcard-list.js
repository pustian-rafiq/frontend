import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import getCurrentUser from "../../../utils/getCurrentUser";
import getCookie from "../../../utils/getCookie";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function createData(no, employee, company, contact, date) {
  return {
    no,
    employee,
    company,
    contact,
    date,
  };
}

const rows = [
  createData(
    1,
    "Md. Rafiqul Islam",
    "Ehsan Marketing",
    "01991166550",
    "Oct. 12, 2022"
  ),
  createData(
    2,
    "Md. Ariful Islam",
    "Ehsan Marketing",
    "01991166550",
    "Oct. 12, 2022"
  ),
  createData(
    3,
    "Md. Nazmul Hossain",
    "Ehsan Marketing",
    "01991166550",
    "Oct. 12, 2022"
  ),
  createData(
    4,
    "Md. Mim Hakkani",
    "Ehsan Marketing",
    "01991166550",
    "Oct. 12, 2022"
  ),
  createData(
    5,
    "Md Mohimenol Islam",
    "Ehsan Marketing",
    "01988906494",
    "Oct. 12, 2022"
  ),
  createData(6, "Md. Shuvo", "Ehsan Marketing", "01991166550", "Oct. 12, 2022"),
];

const IdcardList = ({ token, currentUser }) => {
  // used for print functionalities

  return (
    <div>
      <Typography
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
        }}
      >
        ID Card List
      </Typography>
      <Divider />

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {rows.map((row) => {
                return (
                  <Grid
                    key={row.no}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ my: 3 }}
                  >
                    <Item sx={{ textAlign: "left", pl: 2, pr: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            <img
                              src="/images/rafiq.jpg"
                              height="220"
                              width="220"
                            />
                          </Typography>
                          <Divider />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "5px 0px",
                              color: "#6C757D",
                            }}
                          >
                            {row.employee}
                          </Typography>
                          <Divider />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              padding: "5px 0px",
                              color: "#6C757D",
                            }}
                          >
                            Company: {row.company}
                          </Typography>
                          <Divider />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              padding: "5px 0px",
                              color: "#6C757D",
                            }}
                          >
                            Contact: {row.contact}
                          </Typography>
                          <Divider />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              padding: "5px 0px",
                              color: "#6C757D",
                            }}
                          >
                            Expire Date: {row.date}
                          </Typography>
                          <Divider />
                          <Typography
                            sx={{ textAlign: "center", marginTop: "3px" }}
                          >
                            <Link
                              href={`/admin-dashboard/employee/idcard/${row.no}/`}
                              passHref
                            >
                              <Button
                                sx={{
                                  background: "#3ABAF4",
                                  color: "#fff",
                                  textTransform: "capitalize",
                                  ":hover": { background: "#0eaaed" },
                                }}
                              >
                                Print
                              </Button>
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default withAdminAuth(IdcardList);

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

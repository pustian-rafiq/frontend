import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ReactToPrint from "react-to-print";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import getCurrentUser from "../../../../utils/getCurrentUser";
import getCookie from "../../../../utils/getCookie";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

function createData(
  no,
  id,
  dob,
  email,
  blood,
  employee,
  company,
  contact,
  date
) {
  return {
    no,
    id,
    dob,
    email,
    blood,
    employee,
    company,
    contact,
    date,
  };
}

const rows = [
  createData(
    1,
    "10001",
    "Feb 11, 1997",
    "rafiqul.pust.cse@gmail.com",
    "A+",
    "Md. Rafiqul Islam",
    "Ehsan Marketing",
    "01991166550",
    "Aug 7,2021"
  ),
  createData(
    2,
    "10002",
    "Feb 11, 1997",
    "arifuldesigner2014@gmail.com",
    "B+",
    "Md. Ariful Islam",
    "Ehsan Marketing",
    "01991166550",
    "July 25,2021"
  ),
  createData(
    3,
    "10003",
    "Feb 11, 1997",
    "nazmul.cse48@gmail.com",
    "C+",
    "Md. Nazmul Hossain",
    "Ehsan Marketing",
    "01991166550",
    "Aug 7,2021"
  ),
  createData(
    4,
    "10004",
    "Feb 11, 1997",
    "nazmul.cse48@gmail.com",
    "D+",
    "Md. Mim Hakkani",
    "Ehsan Marketing",
    "01991166550",
    "Aug 7,2021"
  ),
  createData(
    5,
    "10005",
    "Feb 11, 1997",
    "mohimenolmunna@gmail.com",
    "E+",
    "Md Mohimenol Islam",
    "Ehsan Marketing",
    "01988906494",
    "Aug 7,2021"
  ),
  createData(
    6,
    "10006",
    "Feb 11, 1997",
    "nazmul.cse48@gmail.com",
    "F+",
    "Md. Shuvo",
    "Ehsan Marketing",
    "01991166550",
    "Aug 7,2021"
  ),
];

const PrintIdCard = ({ token, currentUser }) => {
  const componentRef = useRef();
  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  //   });

  return (
    <>
      {/* <div ref={componentRef}>Idcard list</div> */}

      <Box sx={{ width: "100%" }} style={{ paddingRight: "5px" }}>
        <ReactToPrint
          trigger={() => (
            <Button
              sx={{ background: "#6563EF", marginRight: "3px" }}
              variant="contained"
            >
              Print
            </Button>
          )}
          content={() => componentRef.current}
        ></ReactToPrint>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Item ref={componentRef}>
              {rows.map((row) => {
                return (
                  <Grid container spacing={0.5} sx={{ marginTop: "2px" }}>
                    <Grid sm={12} md={3} sx={{ ml: 20, mt: 2, mb: 2 }}>
                      <Box
                        sx={{
                          height: "340px",
                          width: "250px",
                          border: "1px solid #000",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "150px",
                            background: "#191947",
                          }}
                        >
                          <Box sx={{ textAlign: "center", paddingTop: "15px" }}>
                            <img
                              src="/images/rafiq.jpg"
                              height="70"
                              width="70"
                              className="imageDiv"
                            />
                          </Box>
                          <Box
                            sx={{
                              textAlign: "center",
                              height: "60%",
                              marginTop: "14px",
                            }}
                          >
                            <Box
                              sx={{
                                backgroundImage:
                                  "url(/images/front_header.jpg)",
                                width: "100%",
                                height: "100%",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                              }}
                            >
                              <Typography
                                sx={{
                                  zIndex: 999,
                                  marginTop: "-20px",
                                  color: "#000",
                                  fontSize: "15px",
                                  paddingTop: "12px",
                                  fontWeight: "bold",
                                }}
                                variant="h4"
                                component="h4"
                              >
                                {row.employee}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "10px",
                                  marginTop: "4px",
                                  color: "#000",
                                }}
                              >
                                {row.company}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ px: 2 }}>
                            <Grid container>
                              <Grid md={12}>
                                <Grid container>
                                  <Grid xs={3} sm={3} md={3}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      ID
                                    </Typography>
                                  </Grid>
                                  <Grid xs={1} sm={1} md={1}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      :
                                    </Typography>
                                  </Grid>
                                  <Grid xs={8} sm={8} md={8}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      {row.id}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid xs={3} sm={3} md={3}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      DOB
                                    </Typography>
                                  </Grid>
                                  <Grid xs={1} sm={1} md={1}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      :
                                    </Typography>
                                  </Grid>
                                  <Grid xs={8} sm={8} md={8}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      {row.dob}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid xs={3} sm={3} md={3}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      MOBILE
                                    </Typography>
                                  </Grid>
                                  <Grid xs={1} sm={1} md={1}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      :
                                    </Typography>
                                  </Grid>
                                  <Grid xs={8} sm={8} md={8}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      {row.contact}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid xs={3} sm={3} md={3}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      EMAIL
                                    </Typography>
                                  </Grid>
                                  <Grid xs={1} sm={1} md={1}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      :
                                    </Typography>
                                  </Grid>
                                  <Grid xs={8} sm={8} md={8}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                        wordWrap: { md: "break-word" },
                                      }}
                                    >
                                      {row.email}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid xs={3} sm={3} md={3}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      BLOOD
                                    </Typography>
                                  </Grid>
                                  <Grid xs={1} sm={1} md={1}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      :
                                    </Typography>
                                  </Grid>
                                  <Grid xs={8} sm={8} md={8}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      {row.blood}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid xs={3} sm={3} md={3}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      JOIN
                                    </Typography>
                                  </Grid>
                                  <Grid xs={1} sm={1} md={1}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      :
                                    </Typography>
                                  </Grid>
                                  <Grid xs={8} sm={8} md={8}>
                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      {row.date}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
                            <img
                              src="/images/bar_code-00011.png"
                              height="30"
                              width="150"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid sm={12} md={3} sx={{ mt: 2, mb: 2, ml: 1 }}>
                      <Box
                        sx={{
                          height: "340px",
                          width: "250px",
                          border: "1px solid #000",
                        }}
                      >
                        <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
                          <img
                            src="/images/ehsan.png"
                            height="50"
                            width="200"
                          />
                        </Box>
                        <Box
                          sx={{
                            paddingTop: "3px",
                            px: 2,
                            display: "inline-block",
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              width: "8px",
                              height: "55px",
                              background: "#000",
                            }}
                          ></Typography>
                          <Typography
                            sx={{
                              ml: 1,
                              textAlign: "justify",
                              fontSize: "11px",
                              color: "#000",
                            }}
                          >
                            If this ID Card is available anywhere without its
                            user, please contact us using the following address.
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", paddingTop: "2px" }}>
                          <img src="/images/qr.png" height="50" width="50" />
                        </Box>
                        <Box sx={{ textAlign: "center", paddingTop: "1px" }}>
                          <img
                            src="/images/sign.jpeg"
                            height="30"
                            width="200px"
                          />

                          <Typography
                            sx={{
                              ml: 8,
                              mt: 1,
                              fontSize: "11px",
                              color: "#000",
                              borderTop: "1px dashed #000",
                              width: "100px",
                              textAlign: "center",
                            }}
                          >
                            Signature of CEO
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", padding: "3px 5px" }}>
                          <Typography sx={{ fontSize: "11px", color: "#000" }}>
                            Hamida Munzil, Holding No. 1565, Jahurul Nagar,
                            Bogura-5800, Bangladesh.
                          </Typography>
                          <Typography sx={{ fontSize: "11px", color: "#000" }}>
                            Email: infoehsanmarketing@gmail.com, Modile:
                            01769921000
                          </Typography>
                          <Typography sx={{ fontSize: "11px", color: "#000" }}>
                            Website:https://ehsanmarketing.com/
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default withAdminAuth(PrintIdCard);

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

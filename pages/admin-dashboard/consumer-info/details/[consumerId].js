import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "../../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";
import client from "../../../../apolloClient/configuration/apolloConfig";
import { GET_COUNTRIES } from "../../../../apolloClient/queries/allCountryQuery";
import useEditConsumer from "../../../../apolloClient/queries/consumer/EditConsumerQuery";
import { useRouter } from "next/router";
import getCookie from "../../../../utils/getCookie";
import PropTypes from "prop-types";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import getCurrentUser from "../../../../utils/getCurrentUser";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import useDetailsConsumer from "../../../../apolloClient/queries/consumer/EditConsumerQuery";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

// Style start here
const tabButton = {
  textTransform: "capitalize",
  fontSize: { xs: "12px", md: "15px" },
  color: "#3E3E3E",
};
const linkButton = {
  fontSize: { xs: "12px", sm: "14px", md: "16px" },
  marginBottom: "5px",
  padding: "5px 5px",
  borderBottom: "1px solid #D6D6D6",
  color: "#3E3E3E",
  ":hover": {
    background: "#F5F5F5",
  },
};
const aboutLeftSection = {
  width: { xs: "30%", sm: "20%" },
  fontSize: { xs: "12px", sm: "14px", md: "15px" },
  wordWrap: { xs: "break-word", sm: "normal" },
};
const aboutRightSection = {
  width: { xs: "70%", sm: "80%" },
  fontSize: { xs: "12px", sm: "14px", md: "15px" },
  wordWrap: { xs: "break-word", sm: "normal" },
};
// const bioLeftSection={
//   width: { xs: '30%', sm: '20%' },
//   fontSize: { xs: '12px', sm: '14px', md: '16px' },
//    wordWrap: { md: 'break-word' }
//   }
// const bioRightSection={
//   width: { xs: '70%', sm: '80%' },
//   fontSize: { xs: '12px', sm: '14px', md: '16px' },
//    wordWrap: { md: 'break-word' }
//   }

const educationLeftSection = {
  width: "35%",
  fontSize: { xs: "12px", sm: "14px", md: "15px" },
};

const parentLeftSection = {
  width: { xs: "40%", sm: "25%" },
  fontSize: { xs: "12px", sm: "14px", md: "15px" },
};
const parentRightSection = {
  width: { xs: "60%", sm: "75%" },
  fontSize: { xs: "12px", sm: "14px", md: "15px" },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ConsumerDetails = ({ token, countries, currentUser }) => {
  const router = useRouter();
  const { consumerId } = router.query;
  const { data: consumerData, loading: consumerLoading } =
    useDetailsConsumer(consumerId);

  console.log("consumerData", consumerData);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (consumerLoading) {
    return <div>Loading data....</div>;
  }
  return (
    <>
      <Box className={styles.sectionTitle}>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            fontWeight: "bold",
          }}
        >
          Consumer Details Informations
        </Typography>
      </Box>
      <div>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item xs={12} md={12}>
              <Item style={{ padding: "20px 20px" }}>
                <Grid container spacing={1}>
                  {/* Left Side */}
                  <Grid item xs={12} sm={12} md={3}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={12}
                        className={styles.rowSpace}
                      >
                        <Box
                          sx={{
                            margin: { xs: "0 auto", sm: "0 0" },
                            border: "1px solid #000",
                            height: "172px",
                            width: "172px",
                            marginBottom: "10px",
                          }}
                        >
                          {consumerData?.consumer?.photo ? (
                            //  <img src={consumerData?.consumer?.photo} width="170" height="170" />
                            <img
                              src={consumerData?.consumer?.photo}
                              width={170}
                              height={170}
                            />
                          ) : (
                            <img
                              src="/images/consumer.png"
                              width={170}
                              height={170}
                            />
                          )}
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={8}
                        md={11}
                        className={styles.rowSpace}
                      >
                        <Grid container sx={{ mt: 3 }}>
                          {consumerData?.consumer?.isMaster ? (
                            ""
                          ) : (
                            <Grid item xs={10} sm={12}>
                              <Typography sx={linkButton}>
                                <Link href="/admin-dashboard/consumer-info/list/root-reference/${consumerData?.consumer?.id}`">
                                  Root Reference List
                                </Link>
                              </Typography>
                            </Grid>
                          )}

                          <Grid item xs={12}>
                            <Typography sx={linkButton}>
                              <Link
                                href={`/admin-dashboard/consumer-info/list/left-reference/${consumerData?.consumer?.id}`}
                              >
                                <a target="_blank">Reference-1 List</a>
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography sx={linkButton}>
                              <Link
                                href={`/admin-dashboard/consumer-info/list/right-reference/${consumerData?.consumer?.id}`}
                              >
                                <a target="_blank">Reference-2 List</a>
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography sx={linkButton}>
                              <Link
                                href={`/admin-dashboard/consumer-info/list/left-foreign-reference/${consumerData?.consumer?.id}`}
                              >
                                <a target="_blank">Foreign Reference-1 List</a>
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography sx={linkButton}>
                              <Link
                                href={`/admin-dashboard/consumer-info/list/right-foreign-reference/${consumerData?.consumer?.id}`}
                              >
                                <a target="_blank">Foreign Reference-2 List</a>
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Right Side */}

                  <Grid item xs={12} md={9}>
                    <Grid item md={12} className={styles.rowSpace}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "14px", sm: "16px", md: "20px" },
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {consumerData?.consumer?.user?.firstName}{" "}
                          {consumerData?.consumer?.user?.lastName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", sm: "14px", md: "15px" },
                            color: "#000",
                          }}
                        >
                          {consumerData?.consumer?.username}{" "}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", sm: "14px", md: "15px" },
                            color: "#000",
                          }}
                        >
                          {" "}
                          {consumerData?.consumer?.isMaster
                            ? " Master Consumer"
                            : "Consumer"}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", sm: "14px", md: "17px" },
                            color: "#000",
                          }}
                        >
                          {" "}
                          {consumerData?.consumer?.country?.name}
                        </Typography>
                        {/* <Typography sx={{ float: 'right', background: 'red', ml: 26 }}>{consumerData?.consumer?.user?.firstName} {consumerData?.consumer?.user?.lastName}</Typography> */}
                      </Box>
                    </Grid>

                    <Grid item md={12} className={styles.rowSpace}>
                      <Box sx={{ width: "100%" }}>
                        <Grid container>
                          <Grid item md={12}>
                            <Box>
                              <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                  <Box
                                    sx={{
                                      maxWidth: {
                                        xs: "220px",
                                        sm: "550px",
                                        md: "650px",
                                      },
                                    }}
                                  >
                                    <Tabs
                                      value={value}
                                      onChange={handleChange}
                                      variant="scrollable"
                                      scrollButtons
                                      allowScrollButtonsMobile
                                      aria-label="scrollable force tabs example"
                                      sx={{
                                        [`& .${tabsClasses.scrollButtons}`]: {
                                          "&.Mui-disabled": { opacity: 0.3 },
                                        },
                                      }}
                                    >
                                      <Tab
                                        sx={tabButton}
                                        label="About"
                                        {...a11yProps(0)}
                                      />
                                      <Tab
                                        sx={tabButton}
                                        label="Biodata"
                                        {...a11yProps(1)}
                                      />
                                      <Tab
                                        sx={tabButton}
                                        label="Education"
                                        {...a11yProps(2)}
                                      />
                                      <Tab
                                        sx={tabButton}
                                        label="Parents"
                                        {...a11yProps(3)}
                                      />
                                      <Tab
                                        sx={tabButton}
                                        label="Account"
                                        {...a11yProps(4)}
                                      />
                                      <Tab
                                        sx={tabButton}
                                        label="Reference"
                                        {...a11yProps(5)}
                                      />
                                      <Tab
                                        sx={tabButton}
                                        label="Address"
                                        {...a11yProps(6)}
                                      />
                                    </Tabs>
                                  </Box>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                  {/* ........Personal Information...... */}
                                  <TabPanel value={value} index={0}>
                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Username
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.username}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Phone
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{consumerData?.consumer?.phone}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Email
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :
                                            {
                                              consumerData?.consumer?.user
                                                ?.email
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Date Of Birth
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.dateOfBirth
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            NID
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.nidNumber}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Gender
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.gender}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Religion
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.religion}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Country
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer?.country
                                                ?.name
                                            }{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Spouse Name
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.spouseName}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>

                                  {/* ........Bio Information...... */}

                                  <TabPanel value={value} index={1}>
                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Bio
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.bio}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Blood Group
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.bloodGroup}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Height
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.height}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Weight
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.weight}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Hobby
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            : {consumerData?.consumer?.hobby}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Marital Status
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.maritalStatus
                                            }{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Languages
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.languages}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Family Members
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.aboutFamilyMembers
                                            }{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            About Tour
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.aboutTour}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={aboutLeftSection}>
                                            Designation
                                          </Typography>
                                          <Typography sx={aboutRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.designationAndServiceOrganization
                                            }{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>

                                  {/* ........Educational Information...... */}

                                  <TabPanel value={value} index={2}>
                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            wordWrap: { xs: "break-word" },
                                          }}
                                        >
                                          <Typography sx={educationLeftSection}>
                                            Primary school name & session
                                          </Typography>
                                          <Typography sx={educationLeftSection}>
                                            :
                                            {
                                              consumerData?.consumer
                                                ?.primaryNameAndSession
                                            }
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={educationLeftSection}>
                                            High school name & session
                                          </Typography>
                                          <Typography sx={educationLeftSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.highschoolNameAndSession
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={educationLeftSection}>
                                            College name & session
                                          </Typography>
                                          <Typography sx={educationLeftSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.collegeNameAndSession
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={educationLeftSection}>
                                            University name & session
                                          </Typography>
                                          <Typography sx={educationLeftSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.universityNameAndSession
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={educationLeftSection}>
                                            PHD
                                          </Typography>
                                          <Typography sx={educationLeftSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.phdNameAndSession
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={educationLeftSection}>
                                            Others name & session
                                          </Typography>
                                          <Typography sx={educationLeftSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.othersNameAndSession
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>

                                  {/* ........Parents Information...... */}

                                  <TabPanel value={value} index={3}>
                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={parentLeftSection}>
                                            Father Name
                                          </Typography>
                                          <Typography sx={parentRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.fatherName}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={parentLeftSection}>
                                            Father Occupation
                                          </Typography>
                                          <Typography sx={parentRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.fatherOccupation
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={parentLeftSection}>
                                            Mother Name
                                          </Typography>
                                          <Typography sx={parentRightSection}>
                                            :{" "}
                                            {consumerData?.consumer?.motherName}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography sx={parentLeftSection}>
                                            Mother Occupation
                                          </Typography>
                                          <Typography sx={parentRightSection}>
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.motherOccupation
                                            }
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>
                                  {/* ........Account Information...... */}

                                  <TabPanel value={value} index={4}>
                                    <Grid
                                      container
                                      spacing={2}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              width: { xs: "25%", sm: "30%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            Phone
                                          </Typography>
                                          <Typography
                                            sx={{
                                              width: { xs: "75%", sm: "70%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.callingCode
                                            }
                                            {consumerData?.consumer?.phone}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              width: { xs: "25%", sm: "30%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            Phone
                                          </Typography>
                                          <Typography
                                            sx={{
                                              width: { xs: "75%", sm: "70%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.callingCode
                                            }
                                            {consumerData?.consumer?.phone}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              width: { xs: "25%", sm: "30%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            Phone
                                          </Typography>
                                          <Typography
                                            sx={{
                                              width: { xs: "75%", sm: "70%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.callingCode
                                            }
                                            {consumerData?.consumer?.phone}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              width: { xs: "25%", sm: "30%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            Phone
                                          </Typography>
                                          <Typography
                                            sx={{
                                              width: { xs: "75%", sm: "70%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.callingCode
                                            }
                                            {consumerData?.consumer?.phone}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                        <Typography sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              width: { xs: "25%", sm: "30%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            Phone
                                          </Typography>
                                          <Typography
                                            sx={{
                                              width: { xs: "75%", sm: "70%" },
                                              fontSize: {
                                                xs: "12px",
                                                sm: "14px",
                                                md: "16px",
                                              },
                                            }}
                                          >
                                            :{" "}
                                            {
                                              consumerData?.consumer
                                                ?.callingCode
                                            }
                                            {consumerData?.consumer?.phone}{" "}
                                          </Typography>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>
                                  {/* ........Reference Information...... */}

                                  <TabPanel value={value} index={5}>
                                    <Grid
                                      container
                                      spacing={1}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12} sm={5} md={5}>
                                        <Grid
                                          container
                                          spacing={1}
                                          sx={{ marginBottom: { xs: "20px" } }}
                                        >
                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Total Root
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.rootCount
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Reference-1
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.ref1Count
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Reference-2
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.ref2Count
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Foreign Reference-1
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree
                                                    ?.ref1ForeignCount
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Foreign Reference-2
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree
                                                    ?.ref2ForeignCount
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>

                                      {/* <Typography sx={{ height: '200px', width: '1px', background: '#D8D4D4', mr: 7, display:{xs:'none',sm:'block'}}} /> */}

                                      <Grid item xs={12} sm={6} md={6}>
                                        <Grid container spacing={1}>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Bronch
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.bronch
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Silver
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.bronch
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Gold
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.gold
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Platinum
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.platinum
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Gem
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.gem
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Pearl
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.pearl
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Diamond
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.diamond
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Ruby
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.ruby
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Emerald
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.emerald
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Crown
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.crown
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={6}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "70%",
                                                    sm: "50%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Paradise
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: {
                                                    xs: "30%",
                                                    sm: "70%",
                                                  },
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.paradise
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>

                                  {/* Consumer Address */}

                                  <TabPanel value={value} index={6}>
                                    <Grid
                                      container
                                      spacing={1}
                                      sx={{ color: "#3E3E3E", mt: 1 }}
                                    >
                                      <Grid item xs={12} sm={5} md={5}>
                                        <Grid
                                          container
                                          spacing={1}
                                          sx={{ marginBottom: { xs: "20px" } }}
                                        >
                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Total Root
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.rootCount
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Reference-1
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.ref1Count
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Reference-2
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree?.ref2Count
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Foreign Reference-1
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree
                                                    ?.ref1ForeignCount
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={12}>
                                            <Typography
                                              sx={{ display: "flex" }}
                                            >
                                              <Typography
                                                sx={{
                                                  width: "60%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                Foreign Reference-2
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  width: "40%",
                                                  fontSize: {
                                                    xs: "12px",
                                                    sm: "14px",
                                                    md: "16px",
                                                  },
                                                }}
                                              >
                                                :{" "}
                                                {
                                                  consumerData?.consumer
                                                    ?.consumerreftree
                                                    ?.ref2ForeignCount
                                                }{" "}
                                              </Typography>
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </TabPanel>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};
export default withAdminAuth(ConsumerDetails);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({ query: GET_COUNTRIES });

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
      countries: data.countries,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

import withConsumerAuth from '../../../components/Dashboard/PrivateRoute/withConsumerAuth'
import getCookie from '../../../utils/getCookie'
import getCurrentUser from '../../../utils/getCurrentUser'
import { useQuery } from "@apollo/client";
import { GET_CONSUMER_DETAILS } from "../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails";


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
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
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
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    wordWrap: { xs: "break-word", sm: "normal" },
  };
  const aboutRightSection = {
    width: { xs: "70%", sm: "80%" },
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
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
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
  };
  const educationRightSection = {
    width: "65%",
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
  };
  
  const parentLeftSection = {
    width: { xs: "40%", sm: "25%" },
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
  };
  const parentRightSection = {
    width: { xs: "60%", sm: "75%" },
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
  };
  const addressSection = {
    width: "50%",
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
    },
  };
  const referenceLeftSection = {
    width: "60%",
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
    },
  };
  const referenceRightSection = {
    width: "40%",
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
    },
  };
  const refCountLeft = {
    width: {
      xs: "70%",
      sm: "50%",
    },
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
    },
  }
  const refCountRight = {
    width: {
      xs: "30%",
      sm: "50%",
    },
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
    },
  }
  
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
            <Typography component="div" >{children}</Typography>
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


const Profile = ({token}) => {
    const router = useRouter();
   // Fetch logged in consumer details
    const { data: ConsumerDetails, loading: consumerLoading } = useQuery( GET_CONSUMER_DETAILS,{
        context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
          fetchPolicy: 'cache-and-network',
    })
      
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    if (consumerLoading) {
      return <div>Loading data....</div>;
    }
    return (
      <>
        <Box className="sectionTitle" >
          <Typography component="div"
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "20px" },
              fontWeight: "bold",
            }}

            
          >
            Consumer Details Informations
          </Typography>
        </Box>
      
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
                          sm={12}
                          md={12}
                          
                        >
                          <Box
                            sx={{
                              margin: { xs: "0 auto", sm: "0 auto" },
                              border: "1px solid #000",
                              height: "170px",
                              width: "170px",
                              marginBottom: "10px",
                            }}
                          >
                            {ConsumerDetails?.me?.consumers?.photo ? (
                            //    <img src={ConsumerDetails?.me?.consumers?.photo} width="170" height="170" />
                              <Image
                                src={ConsumerDetails?.me?.consumers?.photo}
                                width={170}
                                height={170}
                              />
                            ) : (
                              <Image
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
                          sm={12}
                          md={11}    
                        >
                          <Grid container sx={{ mt: 3 }}>
                            {ConsumerDetails?.me?.consumers?.isMaster ? (
                              ""
                            ) : (
                              <Grid item xs={10} sm={12}>
                                <Typography component="div" sx={linkButton}>
                                  <Link href={`/consumer-dashboard/reference-info/root-masters`}>
                                  <a target="_blank">Root Reference List</a>  
                                  </Link>
                                </Typography>
                              </Grid>
                            )}
  
                            <Grid item xs={12}>
                              <Typography component="div"  sx={linkButton}>
                                <Link
                                  href={`/consumer-dashboard/reference-info/reference1`}
                                >
                                  <a target="_blank">Reference-1 List</a>
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography component="div"  sx={linkButton}>
                                <Link
                                  href={`/consumer-dashboard/reference-info/reference2/`}
                                >
                                  <a target="_blank">Reference-2 List</a>
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography component="div"  sx={linkButton}>
                                <Link
                                  href={`/consumer-dashboard/reference-info/ref1-foreign/`}
                                >
                                  <a target="_blank">Foreign Reference-1 List</a>
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography component="div" sx={linkButton}>
                                <Link
                                  href={`/consumer-dashboard/reference-info/ref2-foreign`}
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
                      <Grid item md={12}  >
                        <Box>
                          <Typography component="div"
                            sx={{
                              fontSize: { xs: "14px", sm: "16px", md: "20px" },
                              fontWeight: "bold",
                              color: "#000",
                            }}
                           
                          >
                            {ConsumerDetails?.me?.consumers?.user?.firstName}{" "}
                            {ConsumerDetails?.me?.consumers?.user?.lastName}
                          </Typography>
                          <Typography component="div"
                            sx={{
                              fontSize: { xs: "10px", sm: "14px", md: "15px" },
                              color: "#000",
                            }}
                            
                          >
                            {ConsumerDetails?.me?.consumers?.username}{" "}
                          </Typography>
                          <Typography component="div"
                            sx={{
                              fontSize: { xs: "10px", sm: "14px", md: "15px" },
                              color: "#000",
                            }}
                            
                          >
                            {" "}
                            {ConsumerDetails?.me?.consumers?.isMaster
                              ? " Master Consumer"
                              : "Consumer"}
                          </Typography>
                          <Typography component="div"
                            sx={{
                              fontSize: { xs: "12px", sm: "14px", md: "17px" },
                              color: "#000",
                            }}
                           
                          >
                            {" "}
                            {ConsumerDetails?.me?.consumers?.country?.name}
                          </Typography>
                          {/* <Typography component="div" sx={{ float: 'right', background: 'red', ml: 26 }}>{consumerData?.consumer?.user?.firstName} {consumerData?.consumer?.user?.lastName}</Typography> */}
                        </Box>
                      </Grid>
  
                      <Grid item md={12}  >
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
                                          <Typography component="div"  sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Username
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.username}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Phone
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{ConsumerDetails?.me?.consumers?.phone}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Bkash
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{ConsumerDetails?.me?.consumers?.bKashAcc}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Email
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :
                                              {
                                               ConsumerDetails?.me?.consumers?.user?.email
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Date Of Birth
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {
                                              ConsumerDetails?.me?.consumers?.dateOfBirth
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              NID
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.nidNumber}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Gender
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.gender}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Religion
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.religion}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Country
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.country?.name
                                              }{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Spouse Name
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.spouseName}{" "}
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
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Bio
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.bio}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Blood Group
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.bloodGroup}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Height
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.height}{" '' "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Weight
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.weight}{" Kg"}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Hobby
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              : {ConsumerDetails?.me?.consumers?.hobby}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Marital Status
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.maritalStatus
                                              }{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Languages
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.languages}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Family Members
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {
                                             ConsumerDetails?.me?.consumers?.aboutFamilyMembers
                                              }{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              About Tour
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.aboutTour}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={aboutLeftSection}>
                                              Designation
                                            </Typography>
                                            <Typography component="div" sx={aboutRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.designationAndServiceOrganization
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
                                            <Typography component="div" sx={educationLeftSection}>
                                              Primary school name & session
                                            </Typography>
                                            <Typography component="div" sx={educationRightSection}>
                                              :
                                              {
                                                ConsumerDetails?.me?.consumers?.primaryNameAndSession
                                              }
                                            </Typography>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={educationLeftSection}>
                                              High school name & session
                                            </Typography>
                                            <Typography component="div" sx={educationRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.highschoolNameAndSession
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={educationLeftSection}>
                                              College name & session
                                            </Typography>
                                            <Typography component="div" sx={educationRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.collegeNameAndSession
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={educationLeftSection}>
                                              University name & session
                                            </Typography>
                                            <Typography component="div" sx={educationRightSection}>
                                              :{" "}
                                              {
                                                ConsumerDetails?.me?.consumers?.universityNameAndSession
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={educationLeftSection}>
                                              PHD
                                            </Typography>
                                            <Typography component="div" sx={educationRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.phdNameAndSession
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={educationLeftSection}>
                                              Others name & session
                                            </Typography>
                                            <Typography component="div" sx={educationRightSection}>
                                              :{" "}
                                              {
                                                ConsumerDetails?.me?.consumers?.othersNameAndSession
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
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={parentLeftSection}>
                                              Father Name
                                            </Typography>
                                            <Typography component="div" sx={parentRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.fatherName}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={parentLeftSection}>
                                              Father Occupation
                                            </Typography>
                                            <Typography component="div" sx={parentRightSection}>
                                              :{" "}
                                              {
                                                ConsumerDetails?.me?.consumers?.fatherOccupation
                                              }
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={parentLeftSection}>
                                              Mother Name
                                            </Typography>
                                            <Typography component="div" sx={parentRightSection}>
                                              :{" "}
                                              {ConsumerDetails?.me?.consumers?.motherName}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div" sx={parentLeftSection}>
                                              Mother Occupation
                                            </Typography>
                                            <Typography component="div" sx={parentRightSection}>
                                              :{" "}
                                              {
                                               ConsumerDetails?.me?.consumers?.motherOccupation
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
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div"
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
                                            <Typography component="div"
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
                                               ConsumerDetails?.me?.consumers?.callingCode
                                              }
                                              {ConsumerDetails?.me?.consumers?.phone}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div"
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
                                            <Typography component="div"
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
                                               ConsumerDetails?.me?.consumers?.callingCode
                                              }
                                              {ConsumerDetails?.me?.consumers?.phone}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div"
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
                                            <Typography component="div"
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
                                                ConsumerDetails?.me?.consumers?.callingCode
                                              }
                                              {ConsumerDetails?.me?.consumers?.phone}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div"
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
                                            <Typography component="div"
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
                                               ConsumerDetails?.me?.consumers?.callingCode
                                              }
                                              {ConsumerDetails?.me?.consumers?.phone}{" "}
                                            </Typography>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Typography component="div" sx={{ display: "flex" }}>
                                            <Typography component="div"
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
                                            <Typography component="div"
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
                                              
                                              {ConsumerDetails?.me?.consumers?.phone}{" "}
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
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={referenceLeftSection}
                                                >
                                                  Total Root
                                                </Typography>
                                                <Typography component="div"
                                                  sx={referenceRightSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree?.rootCount
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                   sx={referenceLeftSection}
                                                >
                                                  Reference-1
                                                </Typography>
                                                <Typography component="div"
                                                  sx={referenceRightSection}
                                                >
                                                  :{" "}
                                                  {ConsumerDetails?.me?.consumers?.consumerreftree?.ref1Count}{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                 sx={referenceLeftSection}
                                                >
                                                  Reference-2
                                                </Typography>
                                                <Typography component="div"
                                                  sx={referenceRightSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree?.ref2Count
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                 sx={referenceLeftSection}
                                                >
                                                  Foreign Reference-1
                                                </Typography>
                                                <Typography component="div"
                                                   sx={referenceRightSection}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumerreftree
                                                      ?.ref1ForeignCount
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={referenceLeftSection}
                                                >
                                                  Foreign Reference-2
                                                </Typography>
                                                <Typography component="div"
                                                   sx={referenceRightSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree
                                                      ?.ref2ForeignCount
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
  
                                        {/* <Typography component="div" sx={{ height: '200px', width: '1px', background: '#D8D4D4', mr: 7, display:{xs:'none',sm:'block'}}} /> */}
  
                                        <Grid item xs={12} sm={6} md={6}>
                                          <Grid container spacing={1}>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Bronch
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree?.bronch
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Silver
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree?.bronch
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                 sx={refCountLeft}
                                                >
                                                  Gold
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumerreftree?.gold
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Platinum
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                  ConsumerDetails?.me?.consumers?.consumerreftree?.platinum
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Gem
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumerreftree?.gem
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                 sx={refCountLeft}
                                                >
                                                  Pearl
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                  ConsumerDetails?.me?.consumers?.consumerreftree?.pearl
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Diamond
                                                </Typography>
                                                <Typography component="div"
                                                sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumerreftree?.diamond
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Ruby
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree?.ruby
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Emerald
                                                </Typography>
                                                <Typography component="div"
                                                 sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {ConsumerDetails?.me?.consumers?.consumerreftree?.emerald
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={refCountLeft}
                                                >
                                                  Crown
                                                </Typography>
                                                <Typography component="div"
                                                  sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumerreftree?.crown
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                 sx={refCountLeft}
                                                >
                                                  Paradise
                                                </Typography>
                                                <Typography component="div"
                                                   sx={refCountRight}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumerreftree?.paradise
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
                                        <Grid item xs={12} sm={6} md={6}>
                                          <Grid
                                            container
                                            spacing={1}
                                            sx={{ marginBottom: { xs: "20px" } }}
                                          >
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                  sx={addressSection}
                                                >
                                                 Continent
                                                </Typography>
                                                <Typography component="div"
                                                   sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.continent?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                 Country
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.country?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                   sx={addressSection}
                                                >
                                                 Division/State
                                                </Typography>
                                                <Typography component="div"
                                                  sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.divisionOrState?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  District/City
                                                </Typography>
                                                <Typography component="div"
                                                   sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumeraddresses?.districtOrCity?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                     sx={addressSection}
                                                >
                                                 Police station
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.policeStation?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                 Sub district
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.subDistrict?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                     sx={addressSection}
                                                >
                                                 Road or Street No
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.roadOrStreetNo?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                Post Office
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.postoffice?.zipcode
                                                  } {"-"}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.postoffice?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        {/* Address right section */}

                                        <Grid item xs={12} sm={6} md={6}>
                                          <Grid
                                            container
                                            spacing={1}
                                            sx={{ marginBottom: { xs: "20px" } }}
                                          >
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                   sx={addressSection}
                                                >
                                                 Municipality
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.municipality?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                 Union
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.union?.name
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
  
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                   sx={addressSection}
                                                >
                                                 Word no
                                                </Typography>
                                                <Typography component="div"
                                                     sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.wordNo?.number
                                                  }
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  Village
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                   ConsumerDetails?.me?.consumers?.consumeraddresses?.village?.name
                                                  }
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                Mahalla
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.mahalla
                                                  }{" "}
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                               Block
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.block
                                                  }
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                 Holding no
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  :{" "}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.holdingNo
                                                  } 
                                                </Typography>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                              <Typography component="div"
                                                sx={{ display: "flex" }}
                                              >
                                                <Typography component="div"
                                                     sx={addressSection}
                                                >
                                              House
                                                </Typography>
                                                <Typography component="div"
                                                    sx={addressSection}
                                                >
                                                  : {"-"}
                                                  {
                                                    ConsumerDetails?.me?.consumers?.consumeraddresses?.house
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
    
      </>
    );
}

export default withConsumerAuth(Profile)

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
  
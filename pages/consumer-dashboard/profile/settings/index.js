import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Divider, Grid } from '@mui/material'
import withConsumerAuth from '../../../../components/Dashboard/PrivateRoute/withConsumerAuth'
import getCookie from '../../../../utils/getCookie'
import getCurrentUser from '../../../../utils/getCurrentUser'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GET_CONSUMER_DETAILS } from '../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { GET_COUNTRIES } from '../../../../apolloClient/queries/allCountryQuery';
import Address from '../../../../components/Dashboard/ConsumerDashboard/Settings/Address';
import Parents from '../../../../components/Dashboard/ConsumerDashboard/Settings/Parents';
import About from '../../../../components/Dashboard/ConsumerDashboard/Settings/About';
import Biodata from '../../../../components/Dashboard/ConsumerDashboard/Settings/Biodata';
import Education from '../../../../components/Dashboard/ConsumerDashboard/Settings/Education';
import client from '../../../../apolloClient/configuration/apolloConfig';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SettingProfile = ({ countries, token }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fetch consumer details information
  const { data: ConsumerDetails, loading: consumerLoading } = useQuery(
    GET_CONSUMER_DETAILS,
    {
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
    }
  );

  if (consumerLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ background: "#F6F6F6", mb: "15px" }}>
                  <Box
                    id="profile"
                    style={{
                      marginLeft: "25px",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {ConsumerDetails?.me?.consumers?.photo ? (
                      <Image
                        src={ConsumerDetails?.me?.consumers?.photo}
                        width="100"
                        height="100"
                        className="profilePicture"
                      />
                    ) : (
                      <Image
                        src="/images/product/m-1.jpg"
                        width="100"
                        height="100"
                        className="profilePicture"
                      />
                    )}
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", sm: "16px" },
                        fontWeight: "500",
                        color: "#4B4B4B",
                        textAlign: "center",
                      }}
                    >
                      {ConsumerDetails?.me?.consumers?.user?.firstName}{" "}
                      {ConsumerDetails?.me?.consumers?.user?.lastName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", sm: "13px", md: "13px" },
                        color: "#4B4B4B",
                        textAlign: "center",
                      }}
                    >
                      {ConsumerDetails?.me?.consumers?.username}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", sm: "13px", md: "13px" },
                        color: "#4B4B4B",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {ConsumerDetails?.me?.consumers?.isMaster
                        ? " Master Consumer"
                        : "Consumer"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", sm: "14px", md: "15px" },
                        color: "#4B4B4B",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {ConsumerDetails?.me?.consumers?.country?.name}
                    </Typography>
                    {/* <Typography sx={{ float: 'right', background: 'red', ml: 26 }}>{consumerData?.consumer?.user?.firstName} {consumerData?.consumer?.user?.lastName}</Typography> */}
                  </Box>
                </Box>
                <Divider />

                <Box
                  sx={{
                    background: "#F6F6F6",
                    height: { xs: "200px", sm: "250px", md: "300px" },
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    // sx={{ borderRight: 1, borderColor: 'divider' }}
                  >
                    <Tab
                      sx={{ fontSize: "16px", textTransform: "capitalize" }}
                      label="About"
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{ fontSize: "16px", textTransform: "capitalize" }}
                      label="Biodata"
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{
                        fontSize: "16px",
                        textTransform: "capitalize",
                        paddingLeft: "5px",
                      }}
                      label="Education"
                      {...a11yProps(2)}
                    />
                    <Tab
                      sx={{ fontSize: "16px", textTransform: "capitalize" }}
                      label="Parents"
                      {...a11yProps(3)}
                    />
                    <Tab
                      sx={{ fontSize: "16px", textTransform: "capitalize" }}
                      label="Account"
                      {...a11yProps(4)}
                    />
                    <Tab
                      sx={{ fontSize: "16px", textTransform: "capitalize" }}
                      label="Address"
                      {...a11yProps(5)}
                    />
                  </Tabs>
                </Box>
              </Grid>
              {/* <Typography sx={{width:'2px',height:'100px',background:'black',mt:2}}></Typography> */}
              <Grid item xs={12} sm={8} md={9}>
                {/* About Section start here */}
                <TabPanel value={value} index={0} component={"span"}>
                  {value === 0 ? (
                    <About
                      ConsumerDetails={ConsumerDetails}
                      countries={countries}
                      token={token}
                    />
                  ) : (
                    "Faka"
                  )}
                </TabPanel>
                {/* Biodata Section start here */}
                <TabPanel value={value} index={1}>
                  {value === 1 ? (
                    <Biodata ConsumerDetails={ConsumerDetails} token={token} />
                  ) : (
                    "Faka"
                  )}
                </TabPanel>
                {/* Education Section start here */}
                <TabPanel value={value} index={2}>
                  {value === 2 ? (
                    <Education
                      ConsumerDetails={ConsumerDetails}
                      token={token}
                    />
                  ) : (
                    "Faka"
                  )}
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {value === 3 ? (
                    <Parents ConsumerDetails={ConsumerDetails} token={token} />
                  ) : (
                    "Faka"
                  )}
                </TabPanel>
                <TabPanel value={value} index={4}>
                  Account
                </TabPanel>

                <TabPanel value={value} index={5}>
                  {value === 5 && !consumerLoading ? (
                    <Address
                      ConsumerDetails={ConsumerDetails}
                      consumerLoading={consumerLoading}
                      countries={countries}
                      token={token}
                    />
                  ) : (
                    "Faka"
                  )}
                </TabPanel>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default withConsumerAuth(SettingProfile);
export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const { data } = await client.query({ query: GET_COUNTRIES });
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
      countries: data.countries,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

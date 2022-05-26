import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Button,
  Divider,
  Fab,
  Grid,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import getCookie from "../../../utils/getCookie";
import client from "../../../apolloClient/configuration/apolloConfig";
import { GET_COUNTRIES } from "../../../apolloClient/queries/allCountryQuery";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import { useQuery } from "@apollo/client";
import {
  Use_City_Division,
  use_continent_withCountry,
  Use_Country_Division,
} from "../../../apolloClient/queries/mainHeader/categoryproduct";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const addIcon = {
  marginTop: "30px",
  marginLeft: "5px",
  cursor: "pointer",
  background: "#1565C0",
  height: "30px",
  width: "30px",
  color: "#fff",
  borderRadius: "50%",
  fontSize: {
    xs: "10px",
    sm: "14px",
    md: "14px",
    lg: "25px",
  },
};

const innerAddIcon = {
  marginTop: "20px",
  marginLeft: "10px",
  cursor: "pointer",
  background: "#1565C0",
  height: "25px",
  width: "25px",
  color: "#fff",
  borderRadius: "50%",
  fontSize: {
    xs: "10px",
    sm: "14px",
    md: "14px",
    lg: "25px",
  },
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
          <Typography>{children}</Typography>
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

function Address({ countries, token, currentUser }) {
  const [value, setValue] = useState(0);
  const { register } = useForm();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [continent, setContinent] = React.useState("");
  const [countryid, setCountryid] = useState("");
  const [city, setCity] = useState("");

  const {
    loading: continentLoading,
    error,
    data: continentData,
  } = useQuery(use_continent_withCountry);
  const { loading: divisionLoading, data: divisionData } = useQuery(
    Use_Country_Division,
    {
      variables: {
        id: countryid,
      },
    }
  );

  const { loading: cityLoading, data: cityData } = useQuery(Use_City_Division, {
    variables: {
      id: city,
    },
  });
  console.log("data", continentData);
  console.log("divisionData", divisionData);

  //functionalities show in the countries wise

  if (continentLoading) {
    return <p>loading the data </p>;
  } else {
    var selectedContinent = continentData?.continents?.edges?.filter(
      (cty) => cty?.node?.name === continent
    );
    var countriesData =
      selectedContinent && selectedContinent[0]?.node?.countries?.edges;
  }

  console.log("countriesData", countriesData);
  // catch for continent
  const handleContinent = (event) => {
    setContinent(event.target.value);
  };

  const handleCountry = (e) => {
    setCountryid(e.target.value);
  };

  const handleDivision = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: { xs: 320, sm: 480, md: 900 },
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab label="Continent" />
          <Tab label="Country" />
          <Tab label="Division/State" />
          <Tab label="District/City" />
          <Tab label="PoliceStation" />
          <Tab label="SubDistrict" />
          <Tab label="RoadOrStreetNo" />
          <Tab label="PostOffice" />
          <Tab label="Municipality" />
          <Tab label="Union" />
          <Tab label="WordNo" />
          <Tab label="Village" />
          <Tab label="Mahalla" />
          <Tab label="Block" />
          <Tab label="HoldingNo" />
          <Tab label="House" />
        </Tabs>

        {/* <TabPanel value={value} index={0}>
          ghghjgj
        </TabPanel> */}

        <br />
      </Box>

      <Grid container spacing={1}>
        {/* Left side section */}
        <Grid item md={3}></Grid>
        <Grid item md={6}>
          <Grid container rowSpacing={3}>
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={continentData?.continents?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                name="continent"
                onChange={(event, value) => setContinent(value?.node?.name)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("continent")}
                    {...params}
                    label="Continent *"
                    placeholder="Select Continent *"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Tooltip title="Add Continent">
                <Add sx={addIcon} onClick={handleOpen} />
              </Tooltip>
            </Grid>

            {/* Country */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countriesData && countriesData?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                // defaultValue={countriess.edges[18]}
                name="country"
                onChange={(event, value) => setCountryid(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Select Country *"
                    placeholder="Select Country *"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* Division or state */}

            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Division/State"
                    placeholder="Select Division or state *"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Tooltip title="Add Country">
                <Add sx={addIcon} />
              </Tooltip>
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="District/City *"
                    placeholder="Select District or city *"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>

            {/* Police station */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                //onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Police station"
                    placeholder="Select Police station"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                //onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Subdistrict"
                    placeholder="Select Subdistrict"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Road or Street No"
                    placeholder="Select road or street no"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Post office"
                    placeholder="Select post office"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Municipality"
                    placeholder="Select municipality"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Union"
                    placeholder="Select union"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Word No"
                    placeholder="Select word no"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Village"
                    placeholder="Select village"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Mahalla"
                    placeholder="Select mahalla"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Block"
                    placeholder="Select block"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Holding No"
                    placeholder="Select holding no"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="House"
                    placeholder="Select house"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            {/* District or city */}
            <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Consumer Cin"
                    placeholder="Select consumer cin"
                  />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>

            <Grid item md={4}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "15px",
                  width: "100%",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Right side section */}

        {/* <Grid item md={6}>
          <Grid container rowSpacing={3}>
            <Grid item xs={10} md={10} >
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => option ? option?.node?.name : ''}
                defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register('country')}
                    {...params} label="Select Country *" placeholder="Select Country *" />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}  >
              <Add sx={addIcon} />
            </Grid>
            <Grid item xs={10} md={10} >
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => option ? option?.node?.name : ''}
                defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register('country')}
                    {...params} label="Select Country *" placeholder="Select Country *" />
                )}
              />
            </Grid>
            <Grid xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid>
            <Grid item xs={10} md={10} >
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => option ? option?.node?.name : ''}
                defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register('country')}
                    {...params} label="Select Country *" placeholder="Select Country *" />
                )}
              />
            </Grid>
            <Grid xs={2} md={2} >
              <Add sx={addIcon} />
            </Grid>
          </Grid>

        </Grid> */}
      </Grid>

      {/* Continent Modal*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ border: "none" }}
      >
        <Box sx={{ ...style, minWidth: 300 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="parent-modal-title"
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                fontWeight: "bold",
              }}
            >
              Add New Continent
            </Typography>
            <Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ cursor: "pointer", fontSize: { xs: "18px" } }}
              />
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={9} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Continent"
                  name="continent"
                  {...register("continent", {
                    required: true,
                  })}
                />
              </Grid>
              <Grid xs={3} md={2}>
                <Add sx={innerAddIcon}>
                  <ChildModal />
                </Add>
              </Grid>
              <Grid item md={10}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "15px",
                    width: "100%",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

// Child Modal
function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

export default withAdminAuth(Address);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";
  const getSessionCookie = getCookie(req, isServerSide);
  const { data } = await client.query({ query: GET_COUNTRIES });

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
      countries: data.countries,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

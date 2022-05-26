import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "../../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";

import { Stack, Typography, createFilterOptions } from "@mui/material";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import client from "../../../../apolloClient/configuration/apolloConfig";

import { GET_COUNTRIES } from "../../../../apolloClient/queries/allCountryQuery";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  GET_CONTINENTS,
  GET_COUNTRY_BY_CONTINENT,
  GET_DISTRICT_CITY,
  GET_DIVISION_STATE,
  GET_MUNICIPALITIES,
  GET_POLICE_STATION,
  GET_POST_OFFICES,
  GET_ROAD_OR_STREET,
  GET_SUB_DISTRICT,
  GET_UNIONS,
  GET_VILLAGES,
  GET_WARD_NO,
} from "../../../../apolloClient/queries/address/ContinentQuery";
import getCurrentUser from "../../../../utils/getCurrentUser";
import useShopMutation from "../../../../apolloClient/mutation/shop/addShop";
import { toast } from "react-toastify";
import useCurrentUserWarehouse from "../../../../apolloClient/queries/ConsumerDashboard/wearhouse/currentUserWarehouse";
import AddDivision from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddDivision";
import AddDistrict from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddDistrict";
import AddPoliceStation from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddPoliceStation";
import AddRoadStreet from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddRoadStreet";
import AddPostOffice from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddPostOffice";
import AddMunicipality from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddMunicipality";
import AddWordNo from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddWordno";
import AddVillage from "../../../../components/Dashboard/ConsumerDashboard/Settings/AddVillage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const AddShop = ({
  countries,
  token,
  currentUser,
  warehouses,
  allContinents,
}) => {
  const [slug, setSlug] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [continentId, setContinentId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [policeStationId, setPoliceStationId] = useState("");
  const [policStationName, setPolicStationName] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const [roadStreetId, setRoadStreetId] = useState("");
  const [roadStreetNumber, setRoadStreetNumber] = useState("");
  const [postOfficeId, setPostOfficeId] = useState("");
  const [postOfficeName, setPostOfficeName] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [municipalityName, setMunicipalityName] = useState("");
  const [unionId, setUnionId] = useState("");
  const [wardNoId, setWardNoId] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  // Image Preview code
  const [shopImagePreview, setShopImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [slider1ImagePreview, setSlider1ImagePreview] = useState(null);
  const [slider2ImagePreview, setSlider2ImagePreview] = useState(null);
  const [slider3ImagePreview, setSlider3ImagePreview] = useState(null);
  const [slider4ImagePreview, setSlider4ImagePreview] = useState(null);

  //autocomplete
  const [dialogValue, setDialogValue] = useState({ name: "" });

  //modal open
  const [openDivisionModal, setOpenDivisionModal] = useState(false);
  const [openDistrictModal, setOpenDistrictModal] = useState(false);
  const [openPoliceStationModal, setOpenPoliceStationModal] = useState(false);
  const [openRoadStreetModal, setOpenRoadStreetModal] = useState(false);
  const [openPostOfficeModal, setOpenPostOfficeModal] = useState(false);
  const [openMunicipalityModal, setOpenMunicipalityModal] = useState(false);
  const [openWardNoModal, setOpenWardNoModal] = useState(false);
  const [openVillageModal, setOpenVillageModal] = useState(false);

  const router = useRouter();
  const filter = createFilterOptions();

  const {
    shopMutationHandler,
    loading: shopLoading,
    error: shopError,
    data: shopData,
  } = useShopMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleShopImage = (event) => {
    setShopImagePreview(event.target.files[0]);
  };
  const handleLogo = (event) => {
    setLogoPreview(event.target.files[0]);
  };
  const handleSlider1Image = (event) => {
    setSlider1ImagePreview(event.target.files[0]);
  };
  const handleSlider2Image = (event) => {
    setSlider2ImagePreview(event.target.files[0]);
  };
  const handleSlider3Image = (event) => {
    setSlider3ImagePreview(event.target.files[0]);
  };
  const handleSlider4Image = (event) => {
    setSlider4ImagePreview(event.target.files[0]);
  };

  //Fetch current latitude and longitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  // Fetch countries data by continent
  const { loading: countryLoading, data: countryData } = useQuery(
    GET_COUNTRY_BY_CONTINENT,
    { variables: { id: continentId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch division or state by country
  const { loading: divisionLoading, data: divisionData } = useQuery(
    GET_DIVISION_STATE,
    { variables: { id: countryId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch district or city by division/state
  const { loading: districtLoading, data: districtData } = useQuery(
    GET_DISTRICT_CITY,
    { variables: { id: divisionId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch police station by district
  const { loading: policStationLoading, data: policeStationData } = useQuery(
    GET_POLICE_STATION,
    { variables: { id: districtId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch sub district by police station
  const { loading: subDistrictLoading, data: subDistrictData } = useQuery(
    GET_SUB_DISTRICT,
    { variables: { id: districtId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch road or street by sub district
  const { loading: roadStreetLoading, data: roadStreetData } = useQuery(
    GET_ROAD_OR_STREET,
    { variables: { id: policeStationId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch rpost offices by police station
  const { loading: postOfficeLoading, data: postOfficeData } = useQuery(
    GET_POST_OFFICES,
    { variables: { id: policeStationId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch municipality by sub district
  const { loading: municipalityLoading, data: municipalityData } = useQuery(
    GET_MUNICIPALITIES,
    { variables: { id: policeStationId }, fetchPolicy: "cache-and-network" }
  );

  // Fetch unions by police stationwardNoData
  const { loading: unionLoading, data: unionData } = useQuery(GET_UNIONS, {
    variables: { id: policeStationId },
    fetchPolicy: "cache-and-network",
  });

  // Fetch word no by union
  const { loading: wardNoLoading, data: wardNoData } = useQuery(GET_WARD_NO, {
    variables: { id: municipalityId },
    fetchPolicy: "cache-and-network",
  });

  // Fetch villages by word no
  const { loading: villageLoading, data: villageData } = useQuery(
    GET_VILLAGES,
    { variables: { id: wardNoId }, fetchPolicy: "cache-and-network" }
  );

  console.log("dialogValue::", dialogValue);
  console.log("wardNoId::", wardNoId);
  console.log("villageId::", villageId);
  console.log("villageName::", villageName);
  if (!wardNoLoading) {
    console.log(
      "check::",
      villageData?.wordNo?.villages?.edges.find(
        (v) => v.node.name === villageName
      )
    );
  }
  console.log("--------------------------------");

  //effect for division id change
  useEffect(() => {
    setDivisionId(
      divisionData?.country?.divisionOrStates?.edges.find(
        (v) => v.node.name === divisionName
      )?.node?.id
    );
  }, [divisionData]);

  //effect for district id change
  useEffect(() => {
    setDistrictId(
      districtData?.divisionOrState?.districtOrCities?.edges.find(
        (v) => v.node.name === districtName
      )?.node?.id
    );
  }, [districtData]);

  //effect for police station id change
  useEffect(() => {
    setPoliceStationId(
      policeStationData?.districtOrCity?.policeStations?.edges.find(
        (v) => v.node.name === policStationName
      )?.node?.id
    );
  }, [policeStationData]);

  //effect for road street id change
  useEffect(() => {
    setRoadStreetId(
      roadStreetData?.policeStation?.roads?.edges.find(
        (v) => v.node.name === roadStreetNumber
      )?.node?.id
    );
  }, [roadStreetData]);

  //effect for post office id change
  useEffect(() => {
    setPostOfficeId(
      postOfficeData?.policeStation?.postoffices?.edges.find(
        (v) => v.node.name === postOfficeName
      )?.node?.id
    );
  }, [postOfficeData]);

  //effect for municipality id change
  useEffect(() => {
    setMunicipalityId(
      municipalityData?.policeStation?.municipalities?.edges.find(
        (v) => v.node.name === municipalityName
      )?.node?.id
    );
  }, [municipalityData]);

  //effect for ward number id change
  useEffect(() => {
    setWardNoId(
      wardNoData?.municipality?.wordnos?.edges.find(
        (v) => v.node.number === wardNumber
      )?.node?.id
    );
  }, [wardNoData]);

  //effect for village id change
  useEffect(() => {
    setVillageId(
      villageData?.wordNo?.villages?.edges.find(
        (v) => v.node.name === villageName
      )?.node?.id
    );
  }, [villageData]);

  //Create slug for shop name
  const shopHandler = (e) => {
    const shopName = e.target.value;
    const slug =
      currentUser.username +
      "/" +
      shopName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    setSlug(slug);
  };

  //Continent data loading show
  // if (loading) {
  //   return <div>Loading......</div>;
  // }

  // Submit add new shop data
  const submitHandler = (data) => {
    console.log("data", data);
    // const countryId = (countries.edges).find((datas) => {
    //     return datas.node.id === country
    // })

    const formData = new FormData();

    for (let i in data) {
      if (i === "shopImage") {
        if (shopImagePreview !== null) {
          formData.append(i, shopImagePreview, shopImagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "logo") {
        if (logoPreview !== null) {
          formData.append(i, logoPreview, logoPreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "sliderImage1") {
        if (slider1ImagePreview !== null) {
          formData.append(i, slider1ImagePreview, slider1ImagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "sliderImage2") {
        if (slider2ImagePreview !== null) {
          formData.append(i, slider2ImagePreview, slider2ImagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "sliderImage3") {
        if (slider3ImagePreview !== null) {
          formData.append(i, slider3ImagePreview, slider3ImagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "sliderImage4") {
        if (slider4ImagePreview !== null) {
          formData.append(i, slider4ImagePreview, slider4ImagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else {
        formData.append(i, data[i]);
      }
      // if (slider1ImagePreview !== null) {
      //   formData.append(i, slider1ImagePreview, slider1ImagePreview.name);
      // } else {
      //   formData.append(i, "");
      // }
      // if (slider2ImagePreview !== null) {
      //   formData.append(i, slider2ImagePreview, slider2ImagePreview.name);
      // } else {
      //   formData.append(i, "");
      // }
      // if (slider3ImagePreview !== null) {
      //   formData.append(i, slider3ImagePreview, slider3ImagePreview.name);
      // } else {
      //   formData.append(i, "");
      // }
      // if (slider4ImagePreview !== null) {
      //   formData.append(i, slider4ImagePreview, slider4ImagePreview.name);
      // } else {
      //   formData.append(i, "");
      // }
      // if (logoPreview !== null) {
      //   formData.append(i, logoPreview, logoPreview.name);
      // } else {
      //   formData.append(i, "");
      // }
    }

    // if (loading) {
    //   return <div>Loading......</div>;
    // }

    shopMutationHandler({
      variables: {
        name: formData.get("name"),
        slug: slug,
        email: formData.get("email"),
        phone: formData.get("phone"),
        latitude: latitude,
        longitude: longitude,
        currentLatitude: latitude,
        currentLongitude: longitude,
        warehouseId: warehouseId,
        continentId: continentId,
        countryId: countryId,
        divisionOrStateId: divisionId,
        districtOrCityId: districtId,
        policeStationId: policeStationId,
        subDistrictId: subDistrictId,
        roadOrStreetNoId: roadStreetId,
        postofficeId: postOfficeId,
        municipalityId: municipalityId,
        unionId: unionId,
        wardNoId: wardNoId,
        villageId: villageId,
        mahalla: formData.get("mahalla"),
        block: formData.get("block"),
        holdingNo: formData.get("holding_no"),
        house: formData.get("house"),
        shopImage: formData.get("shopImage"),
        logo: formData.get("logo"),
        sliderImage1: formData.get("sliderImage1"),
        sliderImage2: formData.get("sliderImage2"),
        sliderImage3: formData.get("sliderImage3"),
        sliderImage4: formData.get("sliderImage4"),
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        console.log("DOne");

        toast.success("Shop added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        // reset({
        //   name: "",
        //   description: "",
        //   referedBy: "",
        //   imagePreview: null,
        // });
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Shop added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
  };
  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "18px", md: "25px", lg: "30px" },
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
          mb: 2,
        }}
      >
        Add New Shop
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Form start here */}
      <form
        className={styles.columnSpace}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Button
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            mb: 1,
            textTransform: "capitalize",
          }}
          variant="contained"
          startIcon={<ArrowBack />}
        >
          <Link href="/consumer-dashboard/inventory/shop/shop-list/">Back</Link>
        </Button>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container>
            <Grid item md={12}>
              <Item style={{ padding: "20px 20px" }}>
                <Grid container spacing={2} rowSpacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop Name *"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="name"
                      {...register("name", {
                        required: true,
                      })}
                      onChange={shopHandler}
                    />
                    <Typography sx={{ color: "#E75C33" }}>
                      {errors.name &&
                        errors.name.type === "required" &&
                        "You must have a shop name"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Slug"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="slug"
                      value={slug}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop Email"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="name"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop Phone Number"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="name"
                      {...register("phone")}
                    />
                  </Grid>

                  {/* All address filed start here */}

                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={warehouses.edges}
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      name="warehouse_id"
                      onChange={(event, value) =>
                        setWarehouseId(value?.node?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...register("warehouse_id")}
                          {...params}
                          label="Shop Warehouse"
                          placeholder="Select warehouse "
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}></Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={allContinents?.continents?.edges}
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      // defaultValue={continentData?.continents?.edges[0]}
                      name="continent"
                      onChange={(event, value) =>
                        setContinentId(value?.node?.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...register("continent")}
                          {...params}
                          label="Shop Continent"
                          placeholder="Select Continent "
                          helperText={
                            continentId
                              ? ""
                              : "First select continent then others field"
                          }
                          FormHelperTextProps={{
                            className: "helperText",
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={
                        !countryLoading && countryData
                          ? countryData?.continent?.countries?.edges
                          : []
                      }
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      //defaultValue={countryData?.continent?.countries?.edges[0]}
                      name="country"
                      onChange={(event, value) => setCountryId(value?.node?.id)}
                      disabled={continentId ? false : true}
                      renderInput={(params) => (
                        <TextField
                          // onChange={(e)=> setCountry(e.target.value)}
                          {...register("country")}
                          {...params}
                          label="Shop Country"
                          placeholder="Select country"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {!divisionLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={divisionData?.country?.divisionOrStates?.edges.find(
                          (v) => v.node.name === divisionName
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenDivisionModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenDivisionModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setDivisionName(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setDivisionId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !divisionLoading && divisionData
                            ? divisionData?.country?.divisionOrStates?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={countryId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Division"
                            placeholder="Select Division"
                          />
                        )}
                      />
                    )}
                    <AddDivision
                      open={openDivisionModal}
                      handleClose={() => setOpenDivisionModal(false)}
                      countries={countryData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setDivisionName={setDivisionName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    {!districtLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={districtData?.divisionOrState?.districtOrCities?.edges.find(
                          (v) => v.node.name === districtName
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenDistrictModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenDistrictModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setDistrictName(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setDistrictId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !districtLoading && districtData
                            ? districtData?.divisionOrState?.districtOrCities
                                ?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={divisionId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select District/City"
                            placeholder="Select District/City"
                          />
                        )}
                      />
                    )}
                    <AddDistrict
                      open={openDistrictModal}
                      handleClose={() => setOpenDistrictModal(false)}
                      divisions={divisionData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setDistrictName={setDistrictName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {!policStationLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={policeStationData?.districtOrCity?.policeStations?.edges.find(
                          (v) => v.node.name === policStationName
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenPoliceStationModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenPoliceStationModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setPolicStationName(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setPoliceStationId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !policStationLoading && policeStationData
                            ? policeStationData?.districtOrCity?.policeStations
                                ?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={districtId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Police Station"
                            placeholder="Select Police Station"
                          />
                        )}
                      />
                    )}
                    <AddPoliceStation
                      open={openPoliceStationModal}
                      handleClose={() => setOpenPoliceStationModal(false)}
                      districts={districtData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setPolicStationName={setPolicStationName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    {!roadStreetLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={roadStreetData?.policeStation?.roads?.edges.find(
                          (v) => v.node.name === roadStreetNumber
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenRoadStreetModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenRoadStreetModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setRoadStreetNumber(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setRoadStreetId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !roadStreetLoading && roadStreetData
                            ? roadStreetData?.policeStation?.roads?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={policeStationId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Road/Street"
                            placeholder="Select Road/Street"
                          />
                        )}
                      />
                    )}
                    <AddRoadStreet
                      open={openRoadStreetModal}
                      handleClose={() => setOpenRoadStreetModal(false)}
                      districts={districtData}
                      policeStations={policeStationData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setRoadStreetNumber={setRoadStreetNumber}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    {!postOfficeLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={postOfficeData?.policeStation?.postoffices?.edges.find(
                          (v) => v.node.name === postOfficeName
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenPostOfficeModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenPostOfficeModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setPostOfficeName(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setPostOfficeId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !postOfficeLoading && postOfficeData
                            ? postOfficeData?.policeStation?.postoffices?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={policeStationId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Post Office"
                            placeholder="Select Post Office"
                          />
                        )}
                      />
                    )}
                    <AddPostOffice
                      open={openPostOfficeModal}
                      handleClose={() => setOpenPostOfficeModal(false)}
                      policeStations={policeStationData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setPostOfficeName={setPostOfficeName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    {!municipalityLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={municipalityData?.policeStation?.municipalities?.edges.find(
                          (v) => v.node.name === municipalityName
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenMunicipalityModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenMunicipalityModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setMunicipalityName(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setMunicipalityId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !municipalityLoading && municipalityData
                            ? municipalityData?.policeStation?.municipalities
                                ?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={policeStationId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Municipality"
                            placeholder="Select Municipality"
                          />
                        )}
                      />
                    )}
                    <AddMunicipality
                      open={openMunicipalityModal}
                      handleClose={() => setOpenMunicipalityModal(false)}
                      policeStations={policeStationData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setMunicipalityName={setMunicipalityName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {!wardNoLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={wardNoData?.municipality?.wordnos?.edges.find(
                          (v) => v.node.number === wardNumber
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenWardNoModal(true);
                              setDialogValue({
                                ...dialogValue,
                                number: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenWardNoModal(true);
                            setDialogValue({
                              ...dialogValue,
                              number: newValue?.node?.inputValue,
                            });
                          } else {
                            setWardNumber(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              number: newValue?.node?.inputValue,
                            });
                          }
                          setWardNoId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                number: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !wardNoLoading && wardNoData
                            ? wardNoData?.municipality?.wordnos?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.number;
                        }}
                        disabled={municipalityId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.number}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Ward Number"
                            placeholder="Select Ward Number"
                          />
                        )}
                      />
                    )}
                    <AddWordNo
                      open={openWardNoModal}
                      handleClose={() => setOpenWardNoModal(false)}
                      municipalities={municipalityData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setWardNumber={setWardNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {/* <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={
                        !villageLoading && villageData
                          ? villageData?.wordNo?.villages?.edges
                          : []
                      }
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      //defaultValue={countries.edges[18]}
                      name="village"
                      onChange={(event, value) => setVillageId(value?.node?.id)}
                      disabled={wardNoId ? false : true}
                      renderInput={(params) => (
                        <TextField
                          // onChange={(e)=> setCountry(e.target.value)}
                          {...register("village")}
                          {...params}
                          label="Shop Village"
                          placeholder="Select village"
                        />
                      )}
                    /> */}

                    {/* ============================================================== */}
                    {!villageLoading && (
                      <Autocomplete
                        size="small"
                        defaultValue={villageData?.wordNo?.villages?.edges.find(
                          (v) => v.node.name === villageName
                        )}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                              setOpenVillageModal(true);
                              setDialogValue({
                                ...dialogValue,
                                name: newValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenVillageModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setVillageName(newValue?.node?.inputValue);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          }
                          setVillageId(newValue?.node?.id);
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              node: {
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                              },
                            });
                          }
                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={
                          !villageLoading && villageData
                            ? villageData?.wordNo?.villages?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option.node.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        disabled={municipalityId ? false : true}
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Village"
                            placeholder="Select Village"
                          />
                        )}
                      />
                    )}
                    <AddVillage
                      open={openVillageModal}
                      handleClose={() => setOpenVillageModal(false)}
                      wards={wardNoData}
                      dialogValue={dialogValue}
                      setDialogValue={setDialogValue}
                      setVillageName={setVillageName}
                    />
                    {/* ============================================================== */}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Mahalla"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="mahalla"
                      {...register("mahalla")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Block"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="block"
                      {...register("block")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Holding No"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="holding_no"
                      {...register("holding_no")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop House"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="longitude"
                      {...register("house")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Latitude"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="latitude"
                      value={latitude}
                      inputProps={{ readOnly: true }}
                      {...register("latitude")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Longitude"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="longitude"
                      value={longitude}
                      inputProps={{ readOnly: true }}
                      {...register("longitude")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Current Latitude"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="current_latitude"
                      value={latitude}
                      inputProps={{ readOnly: true }}
                      {...register("current_latitude")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Current Longitude"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="current_longitude"
                      value={longitude}
                      inputProps={{ readOnly: true }}
                      {...register("current_longitude")}
                    />
                  </Grid>
                  {/* Shop image */}
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={2} sx={{ textAlign: "center" }}>
                      {/* <InputLabel htmlFor="component-simple">Shop image must be selected**</InputLabel> */}
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
                            mx: "auto",
                          }}
                        >
                          {logoPreview ? (
                            <img
                              src={URL.createObjectURL(logoPreview)}
                              width="120"
                              height="120"
                            />
                          ) : (
                            <img
                              src="/images/noimage.jpeg"
                              width="120"
                              height="120"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file0">
                            <Input
                              name="logo"
                              {...register("logo")}
                              accept="image/*"
                              onChange={handleLogo}
                              id="contained-button-file0"
                              multiple
                              type="file"
                            />
                            <Button
                              component="span"
                              sx={{
                                width: "120px",
                                background: "#4F5ECE",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: "#ffff",
                                ":hover": { background: "#4F5ECE" },
                              }}
                            >
                              Logo
                            </Button>
                          </label>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
                            mx: "auto",
                          }}
                        >
                          {shopImagePreview ? (
                            <img
                              src={URL.createObjectURL(shopImagePreview)}
                              width="120"
                              height="120"
                            />
                          ) : (
                            <img
                              src="/images/noimage.jpeg"
                              width="122"
                              height="122"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file1">
                            <Input
                              name="shopImage"
                              {...register("shopImage", {
                                required: true,
                              })}
                              accept="image/*"
                              onChange={handleShopImage}
                              id="contained-button-file1"
                              multiple
                              type="file"
                            />
                            <Button
                              component="span"
                              sx={{
                                width: "120px",
                                background: "#4F5ECE",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: "#ffff",
                                ":hover": { background: "#4F5ECE" },
                              }}
                            >
                              Shop Photo*
                            </Button>
                          </label>
                        </Stack>
                        <Typography sx={{ color: "#E75C33", fontSize: "12px" }}>
                          {errors.shopImage &&
                            errors.shopImage.type === "required" &&
                            "You must have selected shop photo"}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
                            mx: "auto",
                          }}
                        >
                          {slider1ImagePreview ? (
                            <img
                              src={URL.createObjectURL(slider1ImagePreview)}
                              width="120"
                              height="120"
                            />
                          ) : (
                            <img
                              src="/images/noimage.jpeg"
                              width="120"
                              height="120"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file2">
                            <Input
                              name="sliderImage1"
                              {...register("sliderImage1")}
                              accept="image/*"
                              onChange={handleSlider1Image}
                              id="contained-button-file2"
                              multiple
                              type="file"
                            />
                            <Button
                              component="span"
                              sx={{
                                width: "120px",
                                background: "#4F5ECE",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: "#ffff",
                                ":hover": { background: "#4F5ECE" },
                              }}
                            >
                              Slider1 Photo
                            </Button>
                          </label>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        {/* <InputLabel htmlFor="component-simple">Profile Photo</InputLabel> */}
                        <Box
                          sx={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
                            mx: "auto",
                          }}
                        >
                          {slider2ImagePreview ? (
                            <img
                              src={URL.createObjectURL(slider2ImagePreview)}
                              width="120"
                              height="120"
                            />
                          ) : (
                            <img
                              src="/images/noimage.jpeg"
                              width="120"
                              height="120"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file3">
                            <Input
                              name="sliderImage2"
                              {...register("sliderImage2")}
                              accept="image/*"
                              onChange={handleSlider2Image}
                              id="contained-button-file3"
                              multiple
                              type="file"
                            />
                            <Button
                              component="span"
                              sx={{
                                width: "120px",
                                background: "#4F5ECE",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: "#ffff",
                                ":hover": { background: "#4F5ECE" },
                              }}
                            >
                              Slider2 Photo
                            </Button>
                          </label>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
                            mx: "auto",
                          }}
                        >
                          {slider3ImagePreview ? (
                            <img
                              src={URL.createObjectURL(slider3ImagePreview)}
                              width="120"
                              height="120"
                            />
                          ) : (
                            <img
                              src="/images/noimage.jpeg"
                              width="120"
                              height="120"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file4">
                            <Input
                              name="sliderImage3"
                              {...register("sliderImage3")}
                              accept="image/*"
                              onChange={handleSlider3Image}
                              id="contained-button-file4"
                              multiple
                              type="file"
                            />
                            <Button
                              component="span"
                              sx={{
                                width: "120px",
                                background: "#4F5ECE",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: "#ffff",
                                ":hover": { background: "#4F5ECE" },
                              }}
                            >
                              Slider3 Photo
                            </Button>
                          </label>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
                            mx: "auto",
                          }}
                        >
                          {slider4ImagePreview ? (
                            <img
                              src={URL.createObjectURL(slider4ImagePreview)}
                              width="120"
                              height="120"
                            />
                          ) : (
                            <img
                              src="/images/noimage.jpeg"
                              width="120"
                              height="120"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file5">
                            <Input
                              name="sliderImage4"
                              {...register("sliderImage4")}
                              accept="image/*"
                              onChange={handleSlider4Image}
                              id="contained-button-file5"
                              multiple
                              type="file"
                            />
                            <Button
                              component="span"
                              sx={{
                                width: "120px",
                                background: "#4F5ECE",
                                textTransform: "capitalize",
                                fontSize: "14px",
                                color: "#ffff",
                                ":hover": { background: "#4F5ECE" },
                              }}
                            >
                              Slider4 Photo
                            </Button>
                          </label>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ textAlign: { xs: "center" } }}
                      >
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
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default withConsumerAuth(AddShop);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const { data } = await client.query({ query: GET_COUNTRIES });
  const { warehouse } = await useCurrentUserWarehouse(getSessionCookie);
  const { data: allContinents } = await client.query({ query: GET_CONTINENTS });

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
      warehouses: warehouse.me.consumers.warehouses,
      allContinents,
    },
  };
};

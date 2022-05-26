import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
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
  GET_VILLAGES,
  GET_WARD_NO,
} from "../../../../../apolloClient/queries/address/ContinentQuery";
import useShopMutation from "../../../../../apolloClient/mutation/shop/addShop";
import client from "../../../../../apolloClient/configuration/apolloConfig";
import getCookie from "../../../../../utils/getCookie";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import { GET_COUNTRIES } from "../../../../../apolloClient/queries/allCountryQuery";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import { GET_WEARHOUSE_LIST } from "../../../../../apolloClient/queries/ConsumerDashboard/wearhouse/WearhouseQuery";
import useShopDetails from "../../../../../apolloClient/queries/ConsumerDashboard/shop/ShopDetails";

import AddDivision from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddDivision";
import AddDistrict from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddDistrict";

import { createFilterOptions } from "@mui/material/Autocomplete";
import AddPoliceStation from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddPoliceStation";
import AddRoadStreet from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddRoadStreet";
import AddPostOffice from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddPostOffice";
import AddMunicipality from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddMunicipality";
import AddWordNo from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddWordno";
import AddVillage from "../../../../../components/Dashboard/ConsumerDashboard/Settings/AddVillage";
import useUpdateShopMutation from "../../../../../apolloClient/mutation/shop/updateShop copy";
import { toast } from "react-toastify";

const filter = createFilterOptions();
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const addButtonStyle = {
  border: "1px solid #000",
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  background: "#0da8ee",
  color: "white",
  fontSize: "15px",
};
const UpdateShop = ({ countries, token, currentUser, allContinents }) => {
  const router = useRouter();
  const { id } = router.query;
  //Fetch shop details
  const { data: detailsData, error, loading } = useShopDetails(id);

  const [divData, setDivData] = useState("");
  const [distData, setDistData] = useState("");
  const [policeStationData, setPoliceStationData] = useState("");
  const [roadOrStreetData, setRoadOrStreetData] = useState("");
  const [postOfficeData, setPostOfficeData] = useState("");
  const [municipalityData, setMunicipalityData] = useState("");
  const [wordData, setWordData] = useState("");
  const [villageData, setVilageData] = useState("");

  const [slug, setSlug] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [continentId, setContinentId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [policeStationId, setPoliceStationId] = useState("");
  const [roadStreetId, setRoadStreetId] = useState("");
  const [postOfficeId, setPostOfficeId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [wordNoId, setWordNoId] = useState("");
  const [villageId, setVillageId] = useState("");

  //State for openning Modal
  const [openDivisionModal, setOpenDivisionModal] = useState(false);
  const [openDistrictModal, setOpenDistrictModal] = useState(false);
  const [openPoliceStationModal, setOpenPoliceStationModal] = useState(false);
  const [openRoadStreetModal, setOpenRoadStreetModal] = useState(false);
  const [openPostOfficeModal, setOpenPostOfficeModal] = useState(false);
  const [openMunicipalityModal, setOpenMunicipalityModal] = useState(false);
  const [openWordNoModal, setOpenWordNoModal] = useState(false);
  const [openVillageModal, setOpenVillageModal] = useState(false);

  //dialog value
  const [dialogValue, setDialogValue] = useState({
    name: "",
  });

  useEffect(() => {
    setContinentId(detailsData?.shop?.continent?.id);
    setCountryId(detailsData?.shop?.country?.id);
    setDistrictId(detailsData?.shop?.districtOrCity?.id);
    setDivisionId(detailsData?.shop?.divisionOrState?.id);
    setPoliceStationId(detailsData?.shop?.policeStation?.id);
    setWordNoId(detailsData?.shop?.wordNo?.id);
    setMunicipalityId(detailsData?.shop?.municipality?.id);
    setPostOfficeId(detailsData?.shop?.postoffice?.id);
    setWarehouseId(detailsData?.shop?.warehouse?.id);
    setRoadStreetId(detailsData?.shop?.roadOrStreetNo?.id);
    //setSlug(detailsData?.shop?.slug)
    //setUnionId(detailsData?.shop?.union?.id)
    setDialogValue({
      name: detailsData?.shop?.roadOrStreetNo?.name,
    });
  }, [detailsData]);

  const {
    shopUpdateMutationHandler,
    loading: shopLoading,
    error: shopError,
    data: shopData,
  } = useUpdateShopMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Image Preview code
  const [shopImagePreview, setShopImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [slider1ImagePreview, setSlider1ImagePreview] = useState(null);
  const [slider2ImagePreview, setSlider2ImagePreview] = useState(null);
  const [slider3ImagePreview, setSlider3ImagePreview] = useState(null);
  const [slider4ImagePreview, setSlider4ImagePreview] = useState(null);
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
    });
  }, []);

  // Fetch continents data
  const { loading: continentLoading, data: continentData } =
    useQuery(GET_CONTINENTS);

  // Fetch countries data by continent
  const { loading: countryLoading, data: countryData } = useQuery(
    GET_COUNTRY_BY_CONTINENT,
    { variables: { id: continentId } }
  );

  // Fetch division or state by country
  useEffect(() => {
    if (countryId) {
      var data = client.query({
        query: GET_DIVISION_STATE,
        variables: { id: countryId },
      });
      data.then((res) => {
        setDivData(res.data);
      });
    }
  }, [countryId]);
  // Fetch division or state by country
  useEffect(() => {
    if (divisionId) {
      var data = client.query({
        query: GET_DISTRICT_CITY,
        variables: { id: divisionId },
        fetchPolicy: "network-only",
      });
      data.then((res) => {
        setDistData(res.data);
        var disName = res.data?.divisionOrState?.districtOrCities?.edges.find(
          (d) => {
            return d?.node?.name === dialogValue?.name;
          }
        );
        setVillageId(disName?.node?.id);
      });
    }
  }, [divisionId]);

  // Fetch division or state by country
  useEffect(() => {
    if (districtId) {
      var data = client.query({
        query: GET_POLICE_STATION,
        variables: { id: districtId },
      });
      data.then((res) => {
        setPoliceStationData(res.data);
      });
    }
  }, [districtId]);
  // Fetch division or state by country
  useEffect(() => {
    if (policeStationId) {
      var roadData = client.query({
        query: GET_ROAD_OR_STREET,
        variables: { id: policeStationId },
      });
      roadData.then((res) => {
        setRoadOrStreetData(res.data);
      });
    }
    if (policeStationId) {
      var postData = client.query({
        query: GET_POST_OFFICES,
        variables: { id: policeStationId },
      });
      postData.then((res) => {
        setPostOfficeData(res.data);
      });
    }
    if (policeStationId) {
      var miniData = client.query({
        query: GET_MUNICIPALITIES,
        variables: { id: policeStationId },
      });
      miniData.then((res) => {
        setMunicipalityData(res.data);
      });
    }
  }, [policeStationId]);

  // Fetch division or state by country
  useEffect(() => {
    if (municipalityId) {
      var data = client.query({
        query: GET_WARD_NO,
        variables: { id: municipalityId },
      });
      data.then((res) => {
        setWordData(res.data);
      });
    }
  }, [municipalityId]);
  // Fetch division or state by country
  useEffect(() => {
    if (wordNoId) {
      var data = client.query({
        query: GET_VILLAGES,
        variables: { id: wordNoId },
      });
      data.then((res) => {
        setVilageData(res.data);
        var vilName = res.data.wordNo?.villages?.edges.find((d) => {
          return d?.node?.name === dialogValue?.name;
        });
        setVillageId(vilName?.node?.id);
      });
    }
  }, [wordNoId]);

  //  var counData=[]

  // const { loading: divisionLoading, data: divisionData } = useQuery(
  //   GET_DIVISION_STATE,
  //   { variables: { id: countryId } }
  // );

  // Fetch district or city by division/state
  // const { loading: districtLoading, data: districtData } = useQuery(
  //   GET_DISTRICT_CITY,
  //   { variables: { id: divisionId } }
  // );

  // // Fetch police station by district
  // const { loading: policStationLoading, data: policStationData } = useQuery(
  //   GET_POLICE_STATION,
  //   { variables: { id: districtId } }
  // );

  // // Fetch road or street by police station
  // const { loading: roadStreetLoading, data: roadStreetData } = useQuery(
  //   GET_ROAD_OR_STREET,
  //   { variables: { id: policeStationId } }
  // );

  // // Fetch post offices by police station
  // const { loading: postOfficeLoading, data: postOfficeData } = useQuery(
  //   GET_POST_OFFICES,
  //   { variables: { id: policeStationId } }
  // );

  // // Fetch municipality or union by police station
  // const { loading: municaplityLoading, data: municaplityData } = useQuery(
  //   GET_MUNICIPALITIES,
  //   { variables: { id: policeStationId } }
  // );

  // // Fetch word no by union
  // const { loading: wordnoLoading, data: wordnoData } = useQuery(GET_WARD_NO, {
  //   variables: { id: municipalityId },
  // });

  // // Fetch villages by municipality
  // const { loading: villageLoading, data: villageData } = useQuery(
  //   GET_VILLAGES,
  //   { variables: { id: wordNoId } }
  // );
  // Fetch warehouse of logged in user
  const {
    data: warehouseData,
    error: warehouseError,
    loading: warehouseLoading,
  } = useQuery(GET_WEARHOUSE_LIST, {
    variables: { before: null, last: 300 },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

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

  console.log("Shop details Data:::", detailsData);
  console.log("allContinents Data:::", allContinents);
  console.log("continentId Data:::", continentId);
  console.log("countryData Data:::", countryData);

  if (loading) {
    return <div>Loading......</div>;
  }

  // Submit update shop data
  const submitHandler = (data) => {
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
    }
    if (
      !logoPreview &&
      !shopImagePreview &&
      !slider1ImagePreview &&
      !slider2ImagePreview &&
      !slider3ImagePreview &&
      !slider4ImagePreview
    ) {
      var updateShopWithoutImage = {
        id: detailsData?.shop?.id,
        name: formData.get("name"),
        slug: slug ? slug : detailsData?.shop?.slug,
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
        roadOrStreetNoId: roadStreetId,
        postofficeId: postOfficeId,
        municipalityId: municipalityId,
        wordNoId: wordNoId,
        villageId: villageId,
        mahalla: formData.get("mahalla"),
        block: formData.get("block"),
        holdingNo: formData.get("holding_no"),
        house: formData.get("house"),
      };
    } else {
      var updateShopWithImage = {
        id: detailsData?.shop?.id,
        name: formData.get("name"),
        slug: slug ? slug : detailsData?.shop?.slug,
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
        roadOrStreetNoId: roadStreetId,
        postofficeId: postOfficeId,
        municipalityId: municipalityId,
        wordNoId: wordNoId,
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
      };
    }

    shopUpdateMutationHandler({
      variables: updateShopWithoutImage
        ? updateShopWithoutImage
        : updateShopWithImage,
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        toast.success("Shop updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        // router.push("/consumer-dashboard/inventory/shop/shop-list");
      },
      onError: (err) => {
        toast.warn("Shop not updated!", {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
  };

  const onError = (errors, e) => console.log(errors, e);

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
        Update Shop
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Form start here */}
      <form onSubmit={handleSubmit(submitHandler, onError)}>
        <Button
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            mb: 1,
            textTransform: "capitalize",
            background: "#0da8ee",
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
                  {/* Shop name */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop Name *"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="name"
                      defaultValue={detailsData?.shop?.name}
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

                  {/* Slug */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Slug"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="slug"
                      defaultValue={slug ? slug : detailsData?.shop?.slug}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  {/* Shop Email */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop Email"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="email"
                      defaultValue={detailsData?.shop?.email}
                      {...register("email")}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop Phone Number"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="phone"
                      defaultValue={detailsData?.shop?.phone}
                      {...register("phone")}
                    />
                  </Grid>

                  {/* Warehouse */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={
                        warehouseData &&
                        warehouseData?.me?.consumers?.warehouses?.edges
                      }
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      defaultValue={
                        warehouseData &&
                        warehouseData?.me?.consumers?.warehouses?.edges.find(
                          (data) => {
                            return (
                              data?.node?.name ===
                              detailsData?.shop?.warehouse?.name
                            );
                          }
                        )
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

                  {/* Continents */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={allContinents?.continents?.edges}
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      defaultValue={allContinents?.continents?.edges.find(
                        (data) =>
                          data?.node?.id === detailsData?.shop?.continent?.id
                      )}
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

                  {/* Country */}
                  <Grid item xs={12} sm={12} md={6}>
                    {!countryLoading && (
                      <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={
                          countryData
                            ? countryData?.continent?.countries?.edges
                            : []
                        }
                        getOptionLabel={(option) =>
                          option ? option?.node?.name : ""
                        }
                        defaultValue={
                          countryData &&
                          countryData?.continent?.countries?.edges.find(
                            (data) => {
                              return (
                                data?.node?.name ===
                                detailsData?.shop?.country?.name
                              );
                            }
                          )
                        }
                        name="country"
                        onChange={(event, value) =>
                          setCountryId(value?.node?.id)
                        }
                        // disabled={continentId ? false : true}
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
                    )}
                  </Grid>

                  {/* Division */}
                  {divData && (
                    <Grid item xs={12} sm={12} md={6}>
                      <Autocomplete
                        defaultValue={
                          divData?.country?.divisionOrStates?.edges.length > 0
                            ? divData?.country?.divisionOrStates?.edges.find(
                                (data) => {
                                  return data?.node?.id === divisionId;
                                }
                              )
                            : ""
                        }
                        size="small"
                        name="division_state"
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            setTimeout(() => {
                              setDialogValue({
                                ...dialogValue,
                                name: newValue?.node?.inputValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenDivisionModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                            setDivisionId(newValue?.node?.id);
                          }
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
                          divData
                            ? divData?.country?.divisionOrStates?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option?.node?.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField {...params} label="Division/State" />
                        )}
                      />
                    </Grid>
                  )}

                  {/* District  */}
                  <Grid item xs={12} sm={12} md={6}>
                    {distData && (
                      <Autocomplete
                        defaultValue={
                          distData &&
                          distData?.divisionOrState?.districtOrCities?.edges.find(
                            (data) => {
                              return data?.node?.id === districtId;
                            }
                          )
                        }
                        size="small"
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            setTimeout(() => {
                              setDialogValue({
                                ...dialogValue,
                                name: newValue?.node?.inputValue,
                              });
                              union;
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenDistrictModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                            setDistrictId(newValue?.node?.id);
                          }
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
                          distData
                            ? distData?.divisionOrState?.districtOrCities?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option?.node?.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField {...params} label="District/City" />
                        )}
                      />
                    )}
                  </Grid>

                  {/* Police stattion */}

                  <Grid item xs={12} sm={12} md={6}>
                    {policeStationData && (
                      <Autocomplete
                        defaultValue={
                          policeStationData &&
                          policeStationData?.districtOrCity?.policeStations?.edges.find(
                            (data) => {
                              return data?.node?.id === policeStationId;
                            }
                          )
                        }
                        size="small"
                        name="police_station"
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            setTimeout(() => {
                              setDialogValue({
                                ...dialogValue,
                                name: newValue?.node?.inputValue,
                              });
                            });
                          } else if (newValue && newValue?.node?.inputValue) {
                            setOpenPoliceStationModal(true);
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          } else {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                            setPoliceStationId(newValue?.node?.id);
                          }
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
                          policeStationData
                            ? policeStationData?.districtOrCity?.policeStations
                                ?.edges
                            : []
                        }
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option?.node?.inputValue) {
                            return option?.node?.inputValue;
                          }
                          return option?.node?.name;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(props, option) => (
                          <li {...props}>{option?.node?.name}</li>
                        )}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="PoliceStation/Sub-district"
                          />
                        )}
                      />
                    )}
                  </Grid>

                  {/* Road or street no */}

                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      defaultValue={
                        roadOrStreetData &&
                        roadOrStreetData?.policeStation?.roads?.edges.find(
                          (data) => {
                            return data?.node?.name === dialogValue?.name;
                          }
                        )
                      }
                      size="small"
                      name="road_street"
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setTimeout(() => {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          });
                        } else if (newValue && newValue?.node?.inputValue) {
                          setOpenRoadStreetModal(true);
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                        } else {
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                          setRoadStreetId(newValue?.node?.id);
                        }
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
                        roadOrStreetData
                          ? roadOrStreetData?.policeStation?.roads?.edges
                          : []
                      }
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option?.node?.inputValue) {
                          return option?.node?.inputValue;
                        }
                        return option?.node?.name;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => (
                        <li {...props}>{option?.node?.name}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField {...params} label="Road/Street No" />
                      )}
                    />
                  </Grid>

                  {/* Post office */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      defaultValue={
                        postOfficeData &&
                        postOfficeData?.policeStation?.postoffices?.edges.find(
                          (data) => {
                            return (
                              data?.node?.name ===
                              detailsData?.shop?.postoffice?.name
                            );
                          }
                        )
                      }
                      size="small"
                      name="road_street"
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setTimeout(() => {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          });
                        } else if (newValue && newValue?.node?.inputValue) {
                          setPostOfficeId(true);
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                        } else {
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                          setPostOfficeId(newValue?.node?.id);
                        }
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
                        postOfficeData
                          ? postOfficeData?.policeStation?.postoffices?.edges
                          : []
                      }
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option?.node?.inputValue) {
                          return option?.node?.inputValue;
                        }
                        return option?.node?.name;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => (
                        <li {...props}>{option?.node?.name}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField {...params} label="Post office" />
                      )}
                    />
                  </Grid>

                  {/* Municipality */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      defaultValue={
                        municipalityData &&
                        municipalityData?.policeStation?.edges?.find((data) => {
                          return data?.node?.name === municipalityId;
                        })
                      }
                      size="small"
                      name="municipality"
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setTimeout(() => {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          });
                        } else if (newValue && newValue?.node?.inputValue) {
                          setOpenMunicipalityModal(true);
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                        } else {
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                          setMunicipalityId(newValue?.node?.id);
                        }
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
                        municipalityData
                          ? municipalityData?.policeStation?.municipalities
                              ?.edges
                          : []
                      }
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option?.node?.inputValue) {
                          return option?.node?.inputValue;
                        }
                        return option?.node?.name;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => (
                        <li {...props}>{option?.node?.name}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Municipality"
                          placeholder="Municipality or union"
                        />
                      )}
                    />
                  </Grid>

                  {/* Word no */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      defaultValue={
                        wordData &&
                        wordData?.municipality?.wordnos?.edges.find((data) => {
                          return (
                            data?.node?.number ===
                            detailsData?.shop?.wordNo?.number
                          );
                        })
                      }
                      size="small"
                      name="word_no"
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setTimeout(() => {
                            setDialogValue({
                              ...dialogValue,
                              number: newValue?.node?.inputValue,
                            });
                          });
                        } else if (newValue && newValue?.node?.inputValue) {
                          setOpenWordNoModal(true);
                          setDialogValue({
                            ...dialogValue,
                            number: newValue?.node?.inputValue,
                          });
                        } else {
                          setDialogValue({
                            ...dialogValue,
                            number: newValue?.node?.inputValue,
                          });
                          setWordNoId(newValue?.node?.id);
                        }
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
                        wordData ? wordData?.municipality?.wordnos?.edges : []
                      }
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option?.node?.inputValue) {
                          return option?.node?.inputValue;
                        }
                        return option?.node?.number;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => (
                        <li {...props}>{option?.node?.number}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Word no"
                          placeholder="Word no"
                        />
                      )}
                    />
                  </Grid>

                  {/* Village */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      defaultValue={
                        villageData &&
                        villageData?.wordNo?.villages?.edges.find((data) => {
                          return (
                            data?.node?.name ===
                            detailsData?.shop?.village?.name
                          );
                        })
                      }
                      size="small"
                      name="word_no"
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setTimeout(() => {
                            setDialogValue({
                              ...dialogValue,
                              name: newValue?.node?.inputValue,
                            });
                          });
                        } else if (newValue && newValue?.node?.inputValue) {
                          setOpenVillageModal(true);
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                        } else {
                          setDialogValue({
                            ...dialogValue,
                            name: newValue?.node?.inputValue,
                          });
                          setVillageId(newValue?.node?.id);
                        }
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
                        villageData ? villageData?.wordNo?.villages?.edges : []
                      }
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option?.node?.inputValue) {
                          return option?.node?.inputValue;
                        }
                        return option?.node?.name;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => (
                        <li {...props}>{option?.node?.name}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Village"
                          placeholder="Village name"
                        />
                      )}
                    />
                  </Grid>

                  {/* Mahalla */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Mahalla"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="mahalla"
                      value={detailsData?.shop?.mahalla}
                      {...register("mahalla")}
                    />
                  </Grid>

                  {/* Block */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Block"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="block"
                      defaultValue={detailsData?.shop?.block}
                      {...register("block")}
                    />
                  </Grid>

                  {/* Holding No */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Holding No"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="holding_no"
                      defaultValue={detailsData?.shop?.holdingNo}
                      {...register("holding_no")}
                    />
                  </Grid>

                  {/* Shop House */}
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Shop House"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      defaultValue={detailsData?.shop?.house}
                      name="longitude"
                      {...register("house")}
                    />
                  </Grid>

                  {/* Latitude */}
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

                  {/* Current Latitude */}
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

                  {/* Longitude */}
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

                  {/* Current Longitude */}
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
                    <Grid container spacing={2}>
                      {/* <InputLabel htmlFor="component-simple">Shop image must be selected**</InputLabel> */}
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          style={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
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
                              src={detailsData?.shop?.logo}
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
                          style={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
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
                              src={detailsData?.shop?.shopImage}
                              width="120"
                              height="120"
                            />
                          )}
                        </Box>
                        <Stack>
                          <label htmlFor="contained-button-file1">
                            <Input
                              name="shopImage"
                              {...register("shopImage")}
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
                        {/* <Typography sx={{ color: "#E75C33", fontSize: "12px" }}>
                          {errors.shopImage &&
                            errors.shopImage.type === "required" &&
                            "You must have selected shop photo"}
                        </Typography> */}
                      </Grid>

                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          style={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
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
                              src={detailsData?.shop?.sliderImage1}
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
                          style={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
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
                              src={detailsData?.shop?.sliderImage2}
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
                          style={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
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
                              src={detailsData?.shop?.sliderImage3}
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
                          style={{
                            border: "1px solid #000",
                            height: "122px",
                            width: "122px",
                            marginBottom: "10px",
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
                              src={detailsData?.shop?.sliderImage4}
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
      {/* Open modal component */}
      <AddDivision
        open={openDivisionModal}
        handleClose={() => setOpenDivisionModal(false)}
        countries={countryData}
        divisionName={dialogValue?.name}
      />
      <AddDistrict
        open={openDistrictModal}
        handleClose={() => setOpenDistrictModal(false)}
        countries={countryData}
        divisionStates={divData}
        districtName={dialogValue?.name}
      />
      <AddPoliceStation
        open={openPoliceStationModal}
        handleClose={() => setOpenPoliceStationModal(false)}
        districtData={distData}
        policeStationName={dialogValue.name}
        //isAddedPoliceStation={policeStationHandler}
      />
      <AddRoadStreet
        open={openRoadStreetModal}
        handleClose={() => setOpenRoadStreetModal(false)}
        districtData={distData}
        policStationData={policeStationData}
        roadOrStreetName={dialogValue.name}
        setRoadOrStreetName={setDialogValue}
      />
      <AddPostOffice
        open={openPostOfficeModal}
        handleClose={() => setOpenPostOfficeModal(false)}
        policStationData={policeStationData}
        postOfficeName={dialogValue.name}
      />
      <AddMunicipality
        open={openMunicipalityModal}
        handleClose={() => setOpenMunicipalityModal(false)}
        policStationData={policeStationData}
        municipalityName={dialogValue.name}
      />
      <AddWordNo
        open={openWordNoModal}
        handleClose={() => setOpenWordNoModal(false)}
        municaplityData={municipalityData}
        wordNo={dialogValue.name}
      />

      <AddVillage
        open={openVillageModal}
        handleClose={() => setOpenVillageModal(false)}
        wordnoData={wordData}
        villageName={dialogValue.name}
      />
    </>
  );
};

export default withConsumerAuth(UpdateShop);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const { data } = await client.query({ query: GET_COUNTRIES });
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
      allContinents,
    },
  };
};

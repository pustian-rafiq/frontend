import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
//import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";

import { Alert, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import useWarehouseDetails from "../../../../../apolloClient/queries/ConsumerDashboard/wearhouse/WarehouseDetails";
import client from "../../../../../apolloClient/configuration/apolloConfig";
import getCookie from "../../../../../utils/getCookie";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import { GET_COUNTRIES } from "../../../../../apolloClient/queries/allCountryQuery";
import useWarehouseUpdateMutation from "../../../../../apolloClient/mutation/warehouse/updateWarehouse";
import { GET_WEARHOUSE_LIST } from "../../../../../apolloClient/queries/ConsumerDashboard/wearhouse/WearhouseQuery";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import {
  GET_DISTRICT_CITY,
  GET_DIVISION_STATE,
} from "../../../../../apolloClient/queries/address/ContinentQuery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const UpdateWearhouse = ({ countries, token }) => {
  const router = useRouter();
  const [isSelectDivision, setIsSelectDivision] = useState(false);
  const [isSelectDistrict, setIsSelectDistrict] = useState(false);

  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const { id } = router.query;
  //Fetch warehouse details
  const { data: detailsData, error, loading } = useWarehouseDetails(id);

  const [countryId, setCountryId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");

  // Warehouse update mutation
  const {
    warehouseUpdateHandler,
    loading: updateWarehouseLoading,
    error: updatedWarehouseError,
    data: updatedWarehouse,
  } = useWarehouseUpdateMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryId: countryId,
      divisionOrStateId: divisionId,
      districtOrCityId: districtId,
      image: detailsData?.warehouse?.image,
    },
  });

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };

  // Fetch district or city list and handle selected and default value
  const { loading: districtLoading, data: districtData } = useQuery(
    GET_DISTRICT_CITY,
    {
      variables: {
        id: divisionId
          ? divisionId
          : detailsData?.warehouse?.divisionOrState?.id,
      },
    }
  );
  const districtChangeHandler = (event) => {
    setIsSelectDistrict(true);
    setDistrictId(event.target.value);
  };

  const getDistricts = () => {
    if (isSelectDistrict) {
      return districtId;
    }

    const defaultData =
      districtData?.divisionOrState?.districtOrCities?.edges.find((state) => {
        return (
          state?.node?.name === detailsData?.warehouse?.districtOrCity?.name
        );
      });
    return defaultData?.node?.id;
  };

  // Fetch division list and handle selected and default value
  const { loading: divisionLoading, data: divisionData } = useQuery(
    GET_DIVISION_STATE,
    {
      variables: {
        id: countryId ? countryId : detailsData?.warehouse?.country?.id,
      },
    }
  );
  const divisionChangeHandler = (event) => {
    setIsSelectDivision(true);
    setDivisionId(event.target.value);
  };

  const getDivisions = () => {
    if (isSelectDivision) {
      return divisionId;
    }

    const defaultData =
      divisionData &&
      divisionData?.country?.divisionOrStates?.edges.find((state) => {
        return (
          state?.node?.name === detailsData?.warehouse?.divisionOrState?.name
        );
      });
    return defaultData?.node?.id;
  };

  if (loading) {
    return <div> loading.......</div>;
  }

  // Submit master register data
  const submitHandler = (data) => {
    //console.log("data", data);

    //Get image name
    const imagePath = detailsData?.warehouse?.image?.split("/");
    const imageName = imagePath[imagePath.length - 1];

    const formData = new FormData();

    for (let i in data) {
      if (i === "photo") {
        if (imagePreview !== null) {
          formData.append(i, imagePreview, imagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else {
        formData.append(i, data[i]);
      }
    }
    if(!imagePreview){
      var updateWarehouseWithoutImage = {
        id: detailsData?.warehouse?.id,
        name: formData.get("name"),
        description: formData.get("description"),
        countryId: countryId,
        divisionOrStateId: divisionId,
        districtOrCityId: districtId,
      }
    }else{
      var updateWarehouseWithImage = {
        id: detailsData?.warehouse?.id,
        name: formData.get("name"),
        description: formData.get("description"),
        countryId: countryId,
        divisionOrStateId: divisionId,
        districtOrCityId: districtId,
        image: formData.get("photo"),
    }
    }
    warehouseUpdateHandler({
      variables: updateWarehouseWithoutImage ? updateWarehouseWithoutImage : updateWarehouseWithImage ,
      refetchQueries: [{ query: GET_WEARHOUSE_LIST }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        toast.success('Warehouse updated successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/consumer-dashboard/inventory/warehouse/warehouse-list");
          reset({
            name: "",
            description: "",
            referedBy: "",
            imagePreview: null,
          });
          setOpen(false);
        }, 3000);
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn('Warehouse not updated!', {
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
        Add New WearHouse
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Form start here */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Button
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            mb: 1,
            textTransform: "capitalize",
          }}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          <Link href="/consumer-dashboard/inventory/warehouse/warehouse-list/">Back</Link>
        </Button>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container spacing={2} rowSpacing={4}>
            {/* <Grid item md={3}></Grid> */}
            <Grid item md={12}>
              <Item style={{ padding: "20px 20px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Wearhouse name *"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      defaultValue={detailsData?.warehouse?.name}
                      name="name"
                      {...register("name", {
                        required: true,
                      })}
                    />
                    <Typography sx={{ color: "#E75C33" }}>
                      {errors.name &&
                        errors.name.type === "required" &&
                        "You must have waerhouse name"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Wearhouse Description"
                      defaultValue={detailsData?.warehouse?.description}
                      name="description"
                      {...register("description")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={countries ? countries?.edges : []}
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      defaultValue={countries?.edges.find((country) => {
                        return (
                          country?.node.name ===
                          detailsData?.warehouse?.country?.name
                        );
                      })}
                      name="country"
                      onChange={(event, value) =>
                        setCountryId(value ? value?.node?.id : "")
                      }
                      renderInput={(params) => (
                        <TextField
                          // onChange={(e)=> setCountry(e.target.value)}
                          {...register("country")}
                          {...params}
                          label="Country *"
                          placeholder="Select Country"
                        />
                      )}
                    />
                  </Grid>

                  {/* Division or States */}
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl sx={{ minWidth: 420 }} size="small">
                      <InputLabel id="demo-select-small">
                        Select Division/State
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-large"
                        value={getDivisions() ? getDivisions() : ""}
                        {...register("division")}
                        label="Select Division/State"
                        onChange={divisionChangeHandler}
                      >
                        {!divisionLoading &&
                          divisionData &&
                          divisionData?.country?.divisionOrStates?.edges.map(
                            (data, index) => {
                              return (
                                <MenuItem key={index} value={data.node.id}>
                                  {data.node.name}
                                </MenuItem>
                              );
                            }
                          )}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* District or city */}

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl sx={{ minWidth: 420 }} size="small">
                      <InputLabel id="demo-select-small">
                        Select District/City
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-large"
                        value={getDistricts() ? getDistricts() : ""}
                        {...register("district")}
                        label="Select District/City"
                        onChange={districtChangeHandler}
                      >
                        {!districtLoading &&
                          districtData &&
                          districtData?.divisionOrState?.districtOrCities?.edges.map(
                            (data, index) => {
                              return (
                                <MenuItem key={index} value={data.node.id}>
                                  {data.node.name}
                                </MenuItem>
                              );
                            }
                          )}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={3} md={3}>
                    {/* <InputLabel htmlFor="component-simple">Profile Photo</InputLabel> */}
                    <Box
                      style={{
                        border: "1px solid #000",
                        height: "102px",
                        width: "102px",
                        marginBottom: "10px",
                      }}
                    >
                      {imagePreview ? (
                        <img
                          src={URL.createObjectURL(imagePreview)}
                          width="100"
                          height="100"
                        />
                      ) : (
                        <img
                          src={detailsData?.warehouse?.image}
                          width="100"
                          height="100"
                        />
                      )}
                    </Box>
                    <Stack>
                      <label htmlFor="contained-button-file">
                        <Input
                          name="photo"
                          {...register("photo")}
                          accept="image/*"
                          onChange={handleChange}
                          id="contained-button-file"
                          // value={detailsData?.warehouse?.image}
                          multiple
                          type="file"
                        />
                        <Button
                          component="span"
                          sx={{
                            width: "160px",
                            background: "#4F5ECE",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            color: "#ffff",
                            ":hover": { background: "#4F5ECE" },
                          }}
                        >
                          WearHouse Photo
                        </Button>
                      </label>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
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
                      Update
                    </Button>
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

export default withConsumerAuth(UpdateWearhouse);

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

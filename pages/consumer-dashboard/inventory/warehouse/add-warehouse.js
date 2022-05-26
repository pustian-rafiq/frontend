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
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";

import { Alert, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import client from "../../../../apolloClient/configuration/apolloConfig";

import { GET_COUNTRIES } from "../../../../apolloClient/queries/allCountryQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWarehouseMutation from "../../../../apolloClient/mutation/warehouse/addWarehouse";
import { useRouter } from "next/router";
import getCurrentUser from "../../../../utils/getCurrentUser";
import { GET_COUNTRY_DETAILS } from "../../../../apolloClient/queries/ConsumerDashboard/wearhouse/AddressQuery";
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

const AddWearhouse = ({ countries, token }) => {
  const router = useRouter();

  const [countryId, setCountryId] = useState("");
  const [divisionId, setDivisionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const { warehouseMutationHandler, loading, error, data } =
    useWarehouseMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };
  // Fetch countries
  // const {loading, data} = useQuery(GET_COUNTRIES)
  // Fetch country details

  const { loading: countryLoading, data: countryData } = useQuery(
    GET_COUNTRY_DETAILS,
    {
      variables: {
        id: countryId,
      },
    }
  );
  if (!countryLoading) {
    var districtCity = countryData?.country?.divisionOrStates?.edges.filter(
      (city) => {
        return city.node.id === divisionId;
      }
    );
  }

  // useEffect( ()=> {
  //     if (!loading) {
  //         var districtCity = data?.country?.divisionOrStates?.edges.filter((city) => {
  //             return city.node.id === divisionId
  //         })
  //     }
  // })

  // Submit master register data
  const submitHandler = (data) => {
    // const countryId = (countries.edges).find((datas) => {
    //     return datas.node.id === country
    // })

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

    warehouseMutationHandler({
      variables: {
        name: formData.get("name"),
        description: formData.get("description"),
        countryId: countryId,
        divisionOrStateId: divisionId,
        districtOrCityId: districtId,
        image: formData.get("photo"),
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        router.push("/consumer-dashboard/inventory/warehouse/warehouse-list");
        toast.success("Warehouse added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setCountryId("");
        setDistrictId("");
        setDivisionId("");
        reset({
          name: "",
          description: "",
          referedBy: "",
          imagePreview: null,
        });
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Warehouse not added!", {
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
      <form
        className={styles.columnSpace}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Box
          sx={{ width: "100%" }}
          style={open ? { display: "block" } : { display: "none" }}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            variant="filled"
            severity="success"
          >
            New Warehouse Added Successfully!
          </Alert>
        </Box>

        <Box
          sx={{ width: "100%" }}
          style={isError ? { display: "block" } : { display: "none" }}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            variant="filled"
            severity="warning"
          >
            Warehouse not added!
          </Alert>
        </Box>
        <Button
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            mb: 1,
            textTransform: "capitalize",
          }}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          <Link href="/consumer-dashboard/inventory/warehouse/warehouse-list/">
            Back
          </Link>
        </Button>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container spacing={2}>
            {/* <Grid item md={3}></Grid> */}
            <Grid item xs={12}>
              <Item style={{ padding: "20px 20px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Grid sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Wearhouse name *"
                        InputLabelProps={{ style: { fontSize: 15 } }}
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
                    <Grid sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Wearhouse Description"
                        name="description"
                        {...register("description")}
                      />
                    </Grid>
                    <Grid sx={{ mt: 2 }}>
                      <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={countries?.edges}
                        getOptionLabel={(option) =>
                          option ? option?.node?.name : ""
                        }
                        //defaultValue={countries.edges[18]}
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
                    <Grid sx={{ mt: 2 }}>
                      <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={
                          !countryLoading && countryData
                            ? countryData?.country?.divisionOrStates?.edges
                            : []
                        }
                        getOptionLabel={(option) =>
                          option ? option?.node?.name : ""
                        }
                        //defaultValue={data?.country?.divisionOrStates?.edges[0]}
                        disabled={countryId ? false : true}
                        name="division_state"
                        onChange={(event, value) =>
                          setDivisionId(value?.node?.id)
                        }
                        renderInput={(params) => (
                          <TextField
                            // onChange={(e)=> setCountry(e.target.value)}
                            {...register("division_state")}
                            {...params}
                            label="Division/State *"
                            placeholder="Select division or state"
                          />
                        )}
                      />
                    </Grid>
                    <Grid sx={{ mt: 2 }}>
                      <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={
                          districtCity
                            ? districtCity[0]?.node?.districtOrCities?.edges
                            : null
                        }
                        getOptionLabel={(option) =>
                          option ? option?.node?.name : ""
                        }
                        //defaultValue={districtCity?.districtOrCities?.edges[0]}
                        name="district_city"
                        disabled={districtCity?.length > 0 ? false : true}
                        onChange={(event, value) =>
                          setDistrictId(value?.node?.id)
                        }
                        renderInput={(params) => (
                          <TextField
                            // onChange={(e)=> setCountry(e.target.value)}

                            {...register("district_city")}
                            {...params}
                            label="District/City"
                            placeholder="Select district or city"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <InputLabel htmlFor="component-simple">Profile Photo</InputLabel> */}
                    <div
                      style={{
                        border: "1px solid #000",
                        height: "142px",
                        width: "122px",
                        marginBottom: "10px",
                      }}
                    >
                      {imagePreview ? (
                        <img
                          src={URL.createObjectURL(imagePreview)}
                          width="120"
                          height="140"
                        />
                      ) : (
                        <img
                          src="/images/profile-picture.jpg"
                          width="120"
                          height="140"
                        />
                      )}
                    </div>
                    <Stack>
                      <label htmlFor="contained-button-file">
                        <Input
                          name="photo"
                          {...register("photo")}
                          accept="image/*"
                          onChange={handleChange}
                          id="contained-button-file"
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

                  {/* <Grid
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
                      Sign Up
                    </Button>
                  </Grid> */}
                </Grid>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "15px",
                      mt: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default withConsumerAuth(AddWearhouse);

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

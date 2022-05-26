import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import useMasterRegisterMutation from "../../../apolloClient/mutation/auth/consumer/registerMaster";
import { GET_COUNTRIES } from "../../../apolloClient/queries/allCountryQuery";
import { Typography } from "@mui/material";
import getCookie from "../../../utils/getCookie";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";
import client from "../../../apolloClient/configuration/apolloConfig";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GET_MASTER_CONSUMERS } from "../../../apolloClient/queries/consumer/allMasterUserQuery";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const RegisterMasterConsumer = ({ countries, token, currentUser }) => {
  const router = useRouter()
  const [country, setCountry] = useState(countries?.edges[18].node.id);
  const [callingCode, setCallingCode] = useState(countries?.edges[18].node.callingCodes);

  //Call master registration mutation
  const { masterRegisterMutationHandler, loading, error, data } =
    useMasterRegisterMutation();

  // Declare useForm including default values for storing into database
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: countries?.edges[18].node.id,
      gender: genderList[0].type,
      religion: religionList[0].name,
    },
  });

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };

  // Country change handler
  const countryChangeHandler = (event, value) => {
    setCountry(value?.node?.id)
    setCallingCode(value?.node?.callingCodes)
  }

  // Submit master register data
  const submitHandler = (data) => {
    console.log(data)
    // const countryId = countries.edges.find((datas) => {
    //   return datas.node.id === country;
    // });

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

    masterRegisterMutationHandler({
      variables: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        country: country,
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        religion: formData.get("religion"),
        referedBy: formData.get("referedBy"),
        callingCode: callingCode,
        photo: formData.get("photo"),
      },
      refetchQueries: [{ query: GET_MASTER_CONSUMERS }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        console.log("on completed");
        toast.success('Master user added successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/admin-dashboard/consumer-info/master-list");
          reset({
            firstName: "",
            lastName: "",
            referedBy: "",
            phone: "",
          });
        }, 3000);
      },
      onError: (err) => {
        toast.warn('Master user not added!', {
          position: "top-center",
          autoClose: 3000,
        });
        console.log("please input valid value :: ", err);
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
        Register a New Master User
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Form start here */}
      <form
        className={styles.columnSpace}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Button sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' }, mb: 1, textTransform: 'capitalize', background: '#45B9E0', ":hover": { background: '#3a9cbc' } }} variant="contained" startIcon={<ArrowBackIcon />}>
          <Link href="/admin-dashboard/consumer-info/master-list/">
            Back
          </Link>
        </Button>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item md={12}>
              <Item style={{ padding: "20px 20px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="First name *"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      name="firstName"
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    <Typography sx={{ color: "#E75C33" }}>
                      {errors.firstName &&
                        errors.firstName.type === "required" &&
                        "You must have first name"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Last name *"
                      name="lastName"
                      {...register("lastName", {
                        required: true,
                        message: "You must have last name!",
                      })}
                    />
                    <Typography sx={{ color: "#E75C33" }}>
                      {errors.lastName &&
                        errors.lastName.type === "required" &&
                        "You must have second name"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={countries?.edges}
                      getOptionLabel={(option) =>
                        option ? option?.node?.name : ""
                      }
                      defaultValue={countries.edges[18]}
                      name="country"
                      onChange={countryChangeHandler}
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Calling Code *"
                          name="calling_code"
                          value={callingCode}
                          {...register("calling_code")}
                          inputProps={
                            { readOnly: true }
                          }
                          sx={{ background: '#f7f7f7' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8} md={8}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Phone *"
                          name="phone"
                          //placeholder="Phone no must be start without 0"
                          //helperText="Phone no must be start without 0"
                          {...register("phone", {
                            required: true,
                          })}
                        />
                        <Typography sx={{ color: "#E75C33" }}>
                          {errors.phone &&
                            errors.phone.type === "required" &&
                            "You must have phone no"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={genderList}
                      getOptionLabel={(option) => option.type}
                      defaultValue={genderList[0]}
                      // value={gender}
                      name="gender"
                      renderInput={(params) => (
                        <TextField
                          // onChange={(e)=> setReligion(e.target.value)}
                          {...register("gender")}
                          {...params}
                          variant="outlined"
                          label="Select Gender *"
                          placeholder="Select Gender *"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      id="size-small-outlined"
                      size="small"
                      options={religionList}
                      getOptionLabel={(option) => option.name}
                      defaultValue={religionList[0]}
                      renderInput={(params) => (
                        <TextField
                          name="religion"
                          // onChange={(e)=> setReligion(e.target.value)}
                          {...register("religion")}
                          {...params}
                          label="Select Religion *"
                          placeholder="Select Religion *"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      id="fullWidth"
                      label="Refered by"
                      name="referedBy"
                      {...register("referedBy")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>

                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box
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
                    </Box>
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
                            background: '#45B9E0',
                            textTransform: "capitalize",
                            fontSize: "14px",
                            color: "#ffff",
                            ":hover": { background: "#3a9cbc" },
                          }}
                        >
                          Upload Profile Photo
                        </Button>
                      </label>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{ textAlign: { xs: "center" } }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "15px",
                        width: "100%",
                        background: '#45B9E0',
                        ":hover": { background: "#3a9cbc" },
                      }}
                    >
                      Sign Up
                    </Button>

                    <Box sx={{ mt: 1 }}>
                      <Typography sx={{ fontSize: { xs: "12px", md: "15px" } }}>
                        Already have an account ?{" "}
                        <Link href="/signin" style={{ background: "red" }}>
                          Sign In
                        </Link>{" "}
                      </Typography>
                    </Box>
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
export default withAdminAuth(RegisterMasterConsumer);

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

const religionList = [
  { name: "Islam" },
  { name: "Hinduism" },
  { name: "Christianity" },
  { name: "Buddhism" },
  { name: "Jainism" },
  { name: "Others" },
];
const genderList = [{ type: "Male" }, { type: "Female" }, { type: "Others" }];

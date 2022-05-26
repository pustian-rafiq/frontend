import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// icons
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CachedIcon from "@mui/icons-material/Cached";
import PersonIcon from "@mui/icons-material/Person";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMarsAndVenus,
  faPersonPraying,
  faUserTieHairLong,
} from "@fortawesome/free-solid-svg-icons";

// components/apollo client
import Title from "../../components/Header/Title";
import useCountry from "../../apolloClient/queries/allCountryQuery";

// utils
import { globalCookie } from "../../utils/globalCookie";
import { GlobalContext } from "../_app";

// apollo client
import useConsumerRegisterMutation from "../../apolloClient/mutation/auth/consumer/registerMutation";
import Link from "next/link";

const Register = ({ countries }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [callingCodes, setCallingCodes] = useState("");
  const [gender, setGender] = useState("");
  const [genderIcon, setGenderIcon] = useState("/images/profile-picture.jpg");
  const [relegion, setRelegion] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const globalData = useContext(GlobalContext);

  const { consumerRegisterMutationHandler, loading, error, data } =
    useConsumerRegisterMutation();
  const [registerError, setRegisterError] = useState(null);

  

  // image handler
  const imageHandler = (e) => {
    setImagePreview(e.target.files[0]);
  };

  // gender handler
  const genderHandler = (e) => {
    setGender(e.target.value);

    if (e.target.value === "Female") {
      setGenderIcon("images/avater2.jpg");
    } else if (e.target.value === "Male") {
      setGenderIcon("images/avater.jpg");
    } else {
      setGenderIcon("images/profile-picture.jpg");
    }
  };

  // consumer register handler
  const consumerRegisterHandler = (data) => {
    data.country_code = callingCodes;

    console.log("register form data ::", data);

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

    consumerRegisterMutationHandler({
      variables: {
        firstName: formData.get("first_name"),
        lastName: formData.get("lastName"),
        country: formData.get("country"),
        photo: formData.get("photo"),
        mobileNo: formData.get("mobile_no"),
        gender: formData.get("gender"),
        refferedBy: formData.get("refferedBy"),
        callingCode: formData.get("country_code"),
       
      },
      onCompleted: (data) => {
        toast.success(`consumer registration completed`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/login");
      },
      onError: (err) => {
        setRegisterError(err);
        toast.error(`Please inpute valid credentials`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  };

  return (
    <>
      <Title>User Registration</Title>

      <Box
        sx={{
          backgroundImage: "url(/images/svg/loginbg.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "30px",
        }}
      >
        <Container>
          <Box
            sx={{
              color: "var(--white)",
              margin: "auto",
              textAlign: "center",
            }}
            p={2}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: { lg: "40px", md: "35px", sm: "30px", xs: "20px" },
                letterSpacing: "1px",
              }}
            >
              Ehsan Marketing
            </Typography>
          </Box>

          <Paper
            sx={{
              width: { lg: "70%", md: "75%", sm: "80%", xs: "90%" },
              backgroundImage:
                "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
              margin: "0 auto",
              padding: { lg: "20px", xs: "5px" },
              boxShadow:
                "rgb(0 0 0 / 30%) 0px 19px 38px, rgb(0 0 0 / 22%) 0px 15px 12px",
              border: "1px solid rgba(0,0,255,0.3)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography component="div">
                <AssignmentTurnedInIcon fontSize="medium" />{" "}
              </Typography>

              <Typography sx={{ marginLeft: "5px" }} component="div">
                Register Page
              </Typography>
            </Box>

            <Typography textAlign="center" variant="body2">
              Please Fill This Form To Create Account
            </Typography>

            <Typography
              textAlign="center"
              mt={1}
              variant="body2"
              sx={{ textDecoration: "underline" }}
            >
              Already Member ? <Link href="/login">Log In</Link>{" "}
            </Typography>

            {/* form  */}
            <form onSubmit={handleSubmit(consumerRegisterHandler)}>
              <Grid container mt={3} columnSpacing={2}>
                {/* first name  */}
                <Grid item xs={12} sm={12} md={6} mt={2}>
                  <InputLabel shrink htmlFor="first_name ">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <PersonIcon />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        First Name
                      </Typography>
                    </Box>
                  </InputLabel>

                  <OutlinedInput
                    id="first_name"
                    sx={{ backgroundColor: "white", borderRadius: "10px" }}
                    fullWidth
                    size="small"
                    {...register("first_name")}
                    required
                    placeholder="First Name"
                  />
                </Grid>

                {/* last name  */}
                <Grid item xs={12} sm={12} md={6} mt={2}>
                  <InputLabel shrink htmlFor="last_name">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <PersonIcon />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        Last Name
                      </Typography>
                    </Box>
                  </InputLabel>

                  <OutlinedInput
                    sx={{ backgroundColor: "white", borderRadius: "10px" }}
                    fullWidth
                    size="small"
                    {...register("lastName")}
                    required
                    placeholder="Last Name"
                  />
                </Grid>

                {/* select country  */}
                <Grid item xs={12} sm={12} md={6} mt={2}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    shrink
                    htmlFor="country_code"
                  >
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <ClosedCaptionIcon />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        Select Country
                      </Typography>
                    </Box>
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="countryCode"
                    value={country}
                    displayEmpty
                    renderValue={(value) =>
                      value !== "" ? (
                        countryName
                      ) : (
                        <Typography
                          sx={{
                            color: "#a1a1a1",
                          }}
                        >
                          Select country
                        </Typography>
                      )
                    }
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                    }}
                    fullWidth
                    size="small"
                    {...register("country")}
                    onChange={(e) => {
                      let selectedCountry = countries?.edges.find(
                        (sc) => sc.node.id == e.target.value
                      );
                      setCountryName(selectedCountry.node.name);
                      setCallingCodes(selectedCountry.node.callingCodes);
                      setCountry(e.target.value);
                    }}
                    required
                    variant="outlined"
                  >
                    {countries?.edges.map((country) => (
                      <MenuItem key={country.node.id} value={country.node.id}>
                        {country.node.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                {/* mobile no  */}
                <Grid item xs={12} sm={12} md={6} mt={2}>
                  <InputLabel shrink htmlFor="mobileNo">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <PhoneIphoneIcon />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        Mobile No.
                      </Typography>
                    </Box>
                  </InputLabel>

                  <Grid container>
                    {/* country code  */}
                    <Grid item xs={3}>
                      <OutlinedInput
                        id="country_code"
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "10px 0px 0px 10px",
                        }}
                        inputProps={{
                          style: { textAlign: "right" },
                        }}
                        size="small"
                        {...register("country_code")}
                        value={callingCodes}
                        required
                        placeholder="c. code"
                      />
                    </Grid>

                    {/* actual mobile no  */}
                    <Grid item xs={9}>
                      <OutlinedInput
                        id="mobileNo"
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "0px 10px 10px 0px",
                        }}
                        fullWidth
                        size="small"
                        {...register("mobile_no")}
                        required
                        placeholder="Please enter mobile number"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* gender  */}
                <Grid item xs={12} sm={12} md={6} mt={2}>
                  <InputLabel shrink htmlFor="gender">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <FontAwesomeIcon
                          icon={faMarsAndVenus}
                          style={{ fontSize: "20px" }}
                        />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        Gender
                      </Typography>
                    </Box>
                  </InputLabel>
                  <Select
                    id="gender"
                    value={gender}
                    displayEmpty
                    renderValue={(value) =>
                      value !== "" ? (
                        value
                      ) : (
                        <Typography
                          sx={{
                            color: "#a1a1a1",
                          }}
                        >
                          Select Gender
                        </Typography>
                      )
                    }
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                    }}
                    fullWidth
                    size="small"
                    {...register("gender")}
                    variant="outlined"
                    onChange={(e) => genderHandler(e)}
                    required
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                </Grid>

                {/* relegion  */}
                <Grid item xs={12} sm={12} md={6} mt={2}>
                  <InputLabel shrink htmlFor="religion">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <FontAwesomeIcon
                          icon={faPersonPraying}
                          style={{ fontSize: "20px" }}
                        />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        Religion
                      </Typography>
                    </Box>
                  </InputLabel>

                  <Select
                    id="religion"
                    value={relegion}
                    displayEmpty
                    renderValue={(value) =>
                      value !== "" ? (
                        value
                      ) : (
                        <Typography
                          sx={{
                            color: "#a1a1a1",
                          }}
                        >
                          Select relegion Go
                        </Typography>
                      )
                    }
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                    }}
                    fullWidth
                    size="small"
                    {...register("relegion")}
                    variant="outlined"
                    onChange={(e) => setRelegion(e.target.value)}
                    required
                  >
                    <MenuItem value={"Islam"}>Islam</MenuItem>
                    <MenuItem value={"Hindu"}>Hindu</MenuItem>
                    <MenuItem value={"Cristan"}>Cristian</MenuItem>
                    <MenuItem value={"Buddhist"}>Buddhist</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                </Grid>

                {/* refered by  */}
                <Grid item xs={12} mt={2} md={12} sm={12}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography component="div">
                        <img
                          src="/images/svg/refericon.svg"
                          height={20}
                          width={20}
                        />
                      </Typography>

                      <Typography sx={{ marginLeft: "5px" }} component="div">
                        Reffered By
                      </Typography>
                    </Box>
                  </InputLabel>
                  <OutlinedInput
                    id="RefferedBy"
                    sx={{ backgroundColor: "white", borderRadius: "10px" }}
                    fullWidth
                    size="small"
                    {...register("refferedBy")}
                    variant="outlined"
                    required
                    placeholder="Refered By"
                  />
                </Grid>

                {/* photo and recapcha  */}
                <Grid item container spacing={2} mt={2} sm={12} xs={12}>
                  {/* photo  */}
                  <Grid item sm={4}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100px",
                        borderRadius: "5px",
                        textAlign: "center",
                        backgroundColor: "var(--white)",
                      }}
                    >
                      <img
                        src={
                          imagePreview === null
                            ? genderIcon
                            : URL.createObjectURL(imagePreview)
                        }
                        height={100}
                        width={100}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        marginTop: "15px",
                        color: "white",
                      }}
                    >
                      <InputLabel
                        htmlFor="photo"
                        sx={{
                          backgroundColor: "#6c757d",
                          fontSize: "15px",
                          padding: "5px",
                          color: "white",
                          borderRadius: "5px",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "var(--primary)",
                          },
                        }}
                      >
                        Choose Photo
                      </InputLabel>

                      <input
                        type="file"
                        id="photo"
                        {...register("photo")}
                        hidden
                        onChange={(e) => imageHandler(e)}
                      />
                    </Box>
                  </Grid>

                  {/* recapcha  */}
                  <Grid
                    item
                    sm={8}
                    md={8}
                    xs={12}
                    sx={{
                      width: "100%",
                      height: "100px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "60px",
                        borderRadius: "5px",
                        textAlign: "center",
                        backgroundColor: "var(--secondary)",
                      }}
                    >
                      Recapcha
                    </Box>

                    <OutlinedInput
                      id="Address1"
                      sx={{
                        backgroundColor: "white",
                        marginTop: "10px",
                        borderRadius: "10px",
                      }}
                      size="small"
                      fullWidth
                      placeholder="Enter Above Text"
                    />
                    <Button
                      variant="contained"
                      startIcon={<CachedIcon />}
                      size="small"
                      sx={{
                        marginTop: "5px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        fontSize: "10px",
                        "&:hover": {
                          backgroundColor: "var(--primary)",
                        },
                      }}
                    >
                      Recapcha
                    </Button>
                  </Grid>
                </Grid>

                {/* remember me  */}
                <Grid
                  item
                  mt={2}
                  sm={12}
                  xs={12}
                  sx={{
                    marginTop: { xs: "50px", sm: "5px", lg: "2px" },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: " #ffffff", textAlign: "center" }}
                        {...register("remember_me")}
                      />
                    }
                    label="Remember Me"
                    sx={{ color: "white", fontSize: "10px" }}
                  />
                </Grid>

                {/* submit button  */}
                <Grid item mt={2} sm={12} xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#6c757d",
                      color: "white",
                      fontSize: "13px",
                      "&:hover": {
                        backgroundColor: "var(--primary)",
                      },
                    }}
                  >
                    <CheckIcon sx={{ pt: "6px" }} />
                    Create Account
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Box mt={2} sm={12} xs={12}>
              <Divider sx={{ border: "1px dashed rgba(0,0,0,0.1)" }} />
            </Box>

            {/* extra section  */}
            <Box mt={2} sm={12}>
              <Typography textAlign="center" mt={1}>
                Already Member ? <Link href="/login">Login</Link>{" "}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <Typography component="div">
                  <Icon fontSize="small">home</Icon>
                </Typography> */}

                <Typography sx={{ marginLeft: "5px" }} component="div">
                  <Link href="/" underline="hover">
                    Go Home
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

export const getStaticProps = async () => {
  const { countries } = await useCountry();

  return {
    props: {
      countries: countries?.countries,
    },
  };
};

export default Register;

Register.getLayout = function pageLayout(page) {
  return <>{page}</>;
};

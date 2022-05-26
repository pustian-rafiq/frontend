import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//mui components
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton,
} from "@mui/material";

//fontawesome icons

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faTruck,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PublicIcon from "@mui/icons-material/Public";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { GlobalContext } from "../_app";
import { useQuery } from "@apollo/client";

import { USER_LOCATION } from "../../apolloClient/queries/ckeckoutContry/locationQuery";
import useOrderConfirmMutation from "../../apolloClient/mutation/checkOut/useConfirmOrderMutation";

import { useCartListOnServerSide } from "../../apolloClient/queries/cart/useCartListQuery";
import { globalCookie } from "../../utils/globalCookie";

import Title from "../../components/Header/Title";

const backgroundStyle = {
  backgroundImage: `
     url(./images/shopping-cart-bg.svg)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundAttachment: "fixed",
  padding: "50px 0px",
};

const Checkout = ({ cartItems }) => {
  const [cartItemsStateInCheckout, setCartItemsStateInCheckout] = useState(
    cartItems?.carts?.edges
  );
  const [totalCartAmoutInCheckoutPage, setTotalCartAmoutInCheckoutPage] =
    useState(0);
  const [totalCartAmoutUsdInCheckoutPage, setTotalCartAmoutUsdInCheckoutPage] =
    useState(0);

  // shipping cost
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingCostUsd, setShippingCostUsd] = useState(0);

  // country
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");

  // division or state
  const [divisionOrState, setDivisionOrState] = useState(null);
  const [selectedDivisionOrState, setSelectedDivisionOrState] = useState("");
  const [selectedDivisionOrStateName, setSelectedDivisionOrStateName] =
    useState("");

  // district Or Cities
  const [districtOrCity, setDistrictOrCity] = useState(null);
  const [selectedDistrictOrCity, setSelectedDistrictOrCity] = useState("");
  const [selectedDistrictOrCityName, setSelectedDistrictOrCityName] =
    useState("");

  // police station
  const [subDistrict, setSubDistrict] = useState(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedSubDistrictName, setSelectedSubDistrictName] = useState("");

  // municipalities
  const [municipalities, setMunicipalities] = useState(null);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState("");
  const [selectedMunicipalitiesName, setSelectedMunicipalitiesName] =
    useState("");

  // payment types
  const [paymentTypeState, setPaymentTypeState] = useState("bKash");

  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { token, currentUser } = useContext(GlobalContext);
  const { orderConfirmMutationHandler, orderConfirmData } =
    useOrderConfirmMutation();

  // user location
  const { loading, error, data } = useQuery(USER_LOCATION);

  // confirm order handler
  const confirmOrderHandler = (data) => {
    data.paymentTypeState = paymentTypeState;

    orderConfirmMutationHandler({
      variables: {
        paymentProcess: data.paymentTypeState,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber1: data.mobile1,
        phoneNumber2: data.mobile2,
        address: data.address,
        location: data.municipalities,
        area: data.subDistrict,
        districtOrCityName: data.districtOrCity,
        divisionOrStateName: data.divisionOrState,
        countryName: data.country,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: () => {
        toast.success("Order has been confirmed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/consumer-dashboard/inventory/order/myPurchases");
      },
      onError: (err) => {
        toast.success("Order does not confimed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  };

  useEffect(() => {
    // increase z-index of select options
    window.onclick = (event) => {
      let countryList = document.getElementById("menu-country");
      let divisionOrStateList = document.getElementById("menu-divisionOrState");
      let districtOrCityList = document.getElementById("menu-districtOrCity");
      let subDistrictList = document.getElementById("menu-subDistrict");
      let municipalitiesList = document.getElementById("menu-municipalities");

      if (countryList) {
        countryList.style.zIndex = 9999;
      } else if (divisionOrStateList) {
        divisionOrStateList.style.zIndex = 9999;
      } else if (districtOrCityList) {
        districtOrCityList.style.zIndex = 9999;
      } else if (subDistrictList) {
        subDistrictList.style.zIndex = 9999;
      } else if (municipalitiesList) {
        municipalitiesList.style.zIndex = 9999;
      }
    };

    // Total cart amount calculation for billing summary
    if (cartItemsStateInCheckout.length > 0) {
      // total subtotal
      let totalAmountInCheckout = cartItemsStateInCheckout
        .map((item) => item.node.subtotal)
        .reduce((prev, next) => prev + next);

      // total subtotal usd
      let totalAmountUsdInCheckout = cartItemsStateInCheckout
        .map((item) => item.node.subtotalUsd)
        .reduce((prev, next) => prev + next);

      setTotalCartAmoutInCheckoutPage(totalAmountInCheckout);
      setTotalCartAmoutUsdInCheckoutPage(totalAmountUsdInCheckout);
    } else {
      setTotalCartAmoutInCheckoutPage(0);
      setTotalCartAmoutUsdInCheckoutPage(0);
    }
  }, []);

  return (
    <> 
      <Title>Checkout</Title> 
      <Box>
        

        <Box sx={backgroundStyle}>
          <Container>
            <Box sx={{ display: "flex" }}>
              <Box>
                <FontAwesomeIcon
                  icon={faTruck}
                  style={{ 
                  color: "var(--primary)",
                  fontSize: '18px'
                }}
                />
                <Typography variant="span">
                  <Box component="span"
                    sx={{
                      fontSize:{xs:'15px',sm:'17px',md:'19px',lg:'24px'},
                      fontWeight: "300",
                      marginLeft: "6px",
                    }}
                  >
                    Shipping Address
                  </Box>{" "}
                  (To continue, Please Fill Out Your Information)
                </Typography>
              </Box>

              <Link href="/shopping-cart">
                <Box
                  sx={{
                    border: "1px solid gray",
                    padding: { xs: "0px 0px", sm: "5px 10px" },
                    ml: { xs: "10px", sm: "60px", md: "30px",lg:'200px' },
                    cursor: "pointer",
                    width: { xs: "20%", sm: "20%",md:'13%',lg:'10%' },
                    textAlign:'center'
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{ fontSize: "14px", color: "gray" }}
                  />

                  <Typography variant="caption" sx={{ ml: "3px", color: "gray" }}>
                    Back To Cart
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Container>

          <Container>
            <form onSubmit={handleSubmit(confirmOrderHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9}>
                  {/* checkout page  form */}
                  <Paper
                    sx={{
                      p: "25px",
                      mt: "15px",
                      border: "1px solid #f5f6f7",
                      "&:hover": { border: "1px solid var(--primary)" },
                    }}
                  >
                    {/* form  */}
                    <Grid container columnSpacing={2}>
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

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              First Name
                            </Typography>
                          </Box>
                        </InputLabel>

                        <OutlinedInput
                          id="first_name"
                          sx={{ 
                          backgroundColor: "#d5d5d5",
                          borderRadius: "3px",
                          fontSize:'12px'
                        }}
                          fullWidth
                          size="small"
                          {...register("firstName")}
                          value={currentUser?.firstName}
                          readOnly={true}
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

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Last Name
                            </Typography>
                          </Box>
                        </InputLabel>

                        <OutlinedInput
                          sx={{ 
                          backgroundColor: "#d5d5d5", 
                          borderRadius: "3px",
                          fontSize:'12px' ,
                      
                        }}

                          fullWidth
                          size="small"
                          {...register("lastName")}
                          value={currentUser?.lastName}
                          readOnly={true}
                        />
                      </Grid>

                      {/* email  */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="email">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <PersonIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Email
                            </Typography>
                          </Box>
                        </InputLabel>

                        <OutlinedInput
                          sx={{ 
                            backgroundColor: "#d5d5d5", 
                            borderRadius: "3px",
                            fontSize:'12px',
                              "& input::placeholder": {
                                fontSize: "30px"
                              }
                          }}
                          fullWidth
                          size="small"
                          {...register("email")}
                          value={currentUser?.email}
                          readOnly={true}
                        />
                      </Grid>

                      {/* mobile no 1 */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="email">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <PhoneIphoneIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Mobile 1
                            </Typography>
                          </Box>
                        </InputLabel>

                        <OutlinedInput
                          sx={{ 
                            backgroundColor: "#d5d5d5",
                            borderRadius: "3px",
                            fontSize:'12px'
                            }}
                          fullWidth
                          size="small"
                          {...register("mobile1")}
                          value={currentUser?.consumers?.phone}
                          readOnly={true}
                        />
                      </Grid>

                      {/* mobile no 2  */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="email">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <PhoneIphoneIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px"}}
                              component="div"
                            >
                              Mobile 2
                            </Typography>
                          </Box>
                        </InputLabel>

                        <OutlinedInput
                          sx={{ 
                            backgroundColor: "white",
                            borderRadius: "3px",
                            fontSize:'12px' }}
                          fullWidth
                          size="small"
                          {...register("mobile2")}
                          placeholder="Ex. 01xxxxx"
                        />
                      </Grid>

                      {/* select country  */}
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        mt={2}
                        id="select-country"
                      >
                        <InputLabel shrink htmlFor="country">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <PublicIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Country
                            </Typography>
                          </Box>
                        </InputLabel>

                        <Select
                          id="country"
                          value={countryName}
                          displayEmpty
                          renderValue={(value) =>
                            value !== "" ? (
                              countryName
                            ) : (
                              <Typography
                                sx={{
                                  color: "#a1a1a1",
                                  fontSize:'12px'
                                }}
                              >
                                Select Country
                              </Typography>
                            )
                          }
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            fontSize:'12px'
                          }}
                          fullWidth
                          size="small"
                          {...register("country")}
                          variant="outlined"
                          onChange={(e) => {
                            let selectedCountry = data?.countries?.edges.find(
                              (sc) => sc.node.id == e.target.value
                            );

                            setCountry(e.target.value);
                            setCountryName(selectedCountry.node.name);
                            setDivisionOrState(
                              selectedCountry?.node?.divisionOrStates?.edges
                            );

                            setSelectedDivisionOrState("");
                            setSelectedDivisionOrStateName("");

                            setDistrictOrCity(null);
                            setSelectedDistrictOrCity("");
                            setSelectedDistrictOrCityName("");

                            setSubDistrict(null);
                            setSelectedSubDistrict("");
                            setSelectedSubDistrictName("");

                            setMunicipalities(null);
                            setSelectedMunicipalities("");
                            setSelectedMunicipalitiesName("");
                          }}
                          required
                        >
                          {loading && data == undefined ? (
                            <Skeleton
                              variant="rectangular"
                              sx={{
                                width: "80%",
                                height: "1px",
                                margin: "5px auto",
                                padding: "10px",
                              }}
                            />
                          ) : data?.countries?.edges.length > 0 ? (
                            data?.countries?.edges?.map((country) => (
                              <MenuItem
                                key={country?.node?.id}
                                value={country?.node?.id}
                              >
                                {country?.node?.name}
                              </MenuItem>
                            ))
                          ) : (
                            <Typography
                              sx={{ textAlign: "center", ml: "15px" }}
                              variant="caption"
                            >
                              No Country Available
                            </Typography>
                          )}
                        </Select>
                      </Grid>

                      {/* select state / division  */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="division">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <AcUnitIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Division or State
                            </Typography>
                          </Box>
                        </InputLabel>

                        {divisionOrState !== null ? (
                          <Select
                            id="division"
                            value={selectedDivisionOrStateName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedDivisionOrStateName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Select Division Or State
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            {...register("divisionOrState")}
                            variant="outlined"
                            onChange={(e) => {
                              let sdos = divisionOrState?.find(
                                (sds) => sds.node.id == e.target.value
                              );

                              setSelectedDivisionOrState(e.target.value);
                              setSelectedDivisionOrStateName(sdos.node.name);
                              setDistrictOrCity(
                                sdos?.node?.districtOrCities?.edges
                              );

                              setSelectedDistrictOrCity("");
                              setSelectedDistrictOrCityName("");

                              setSubDistrict(null);
                              setSelectedSubDistrict("");
                              setSelectedSubDistrictName("");

                              setMunicipalities(null);
                              setSelectedMunicipalities("");
                              setSelectedMunicipalitiesName("");
                            }}
                            required
                          >
                            {divisionOrState.length > 0 ? (
                              divisionOrState?.map((divisionState) => (
                                <MenuItem
                                  key={divisionState?.node?.id}
                                  value={divisionState?.node?.id}
                                >
                                  {divisionState?.node?.name}
                                </MenuItem>
                              ))
                            ) : (
                              <Typography
                                sx={{ textAlign: "center", ml: "15px" }}
                                variant="caption"
                              >
                                No Division Or State Found
                              </Typography>
                            )}
                          </Select>
                        ) : (
                          <Select
                            id="division"
                            value={selectedDivisionOrState}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedDivisionOrStateName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Select Division Or State
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            variant="outlined"
                            required
                            disabled
                          >
                            <MenuItem value=""></MenuItem>
                          </Select>
                        )}
                      </Grid>

                      {/* select city / District */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="city">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <LocationCityIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              District or City
                            </Typography>
                          </Box>
                        </InputLabel>

                        {districtOrCity !== null ? (
                          <Select
                            id="city"
                            value={selectedDistrictOrCityName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedDistrictOrCityName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Select District or City
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            {...register("districtOrCity")}
                            variant="outlined"
                            onChange={(e) => {
                              let doc = districtOrCity?.find(
                                (dc) => dc.node?.id == e.target.value
                              );

                              setSelectedDistrictOrCity(e.target.value);
                              setSelectedDistrictOrCityName(doc.node?.name);
                              setSubDistrict(doc.node?.policeStations?.edges);

                              setSelectedSubDistrict("");
                              setSelectedSubDistrictName("");

                              setMunicipalities(null);
                              setSelectedMunicipalities("");
                              setSelectedMunicipalitiesName("");
                            }}
                            required
                          >
                            {districtOrCity.length > 0 ? (
                              districtOrCity?.map((districtCity) => (
                                <MenuItem
                                  key={districtCity.node?.id}
                                  value={districtCity.node?.id}
                                >
                                  {districtCity.node?.name}
                                </MenuItem>
                              ))
                            ) : (
                              <Typography
                                sx={{ textAlign: "center", ml: "15px" }}
                                variant="caption"
                              >
                                No District or City Found
                              </Typography>
                            )}
                          </Select>
                        ) : (
                          <Select
                            id="city"
                            value={selectedDistrictOrCityName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedDistrictOrCityName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Select District or City
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            variant="outlined"
                            required
                            disabled
                          >
                            {districtOrCity?.map((districtCity) => (
                              <MenuItem
                                key={districtCity.node?.id}
                                value={districtCity.node?.id}
                              >
                                {districtCity.node?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>

                      {/* police station/ upazila  */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="policeStation">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <LocationCityIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Police Station / Upazila
                            </Typography>
                          </Box>
                        </InputLabel>

                        {subDistrict !== null ? (
                          <Select
                            id="policeStation"
                            value={selectedSubDistrictName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedSubDistrictName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Police Station / Upazila
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            {...register("subDistrict")}
                            variant="outlined"
                            onChange={(e) => {
                              let sd = subDistrict?.find(
                                (dc) => dc.node?.id == e.target.value
                              );

                              console.log("selected subDistrict :", sd);

                              setSelectedSubDistrict(e.target.value);
                              setSelectedSubDistrictName(sd?.node?.name);
                              setMunicipalities(sd?.node?.municipalities?.edges);

                              setSelectedMunicipalities("");
                              setSelectedMunicipalitiesName("");
                            }}
                            required
                          >
                            {subDistrict.length > 0 ? (
                              subDistrict?.map((subDistrict) => (
                                <MenuItem
                                  key={subDistrict.node?.id}
                                  value={subDistrict.node?.id}
                                >
                                  {subDistrict.node?.name}
                                </MenuItem>
                              ))
                            ) : (
                              <Typography
                                sx={{ textAlign: "center", ml: "15px" }}
                                variant="caption"
                              >
                                No Police Station / Upazila Found
                              </Typography>
                            )}
                          </Select>
                        ) : (
                          <Select
                            id="policeStation"
                            value={selectedSubDistrictName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedSubDistrictName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Police Station / Upazila
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            variant="outlined"
                            required
                            disabled
                          >
                            {subDistrict?.map((subDistrict) => (
                              <MenuItem
                                key={subDistrict.node?.id}
                                value={subDistrict.node?.id}
                              >
                                {subDistrict.node?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>

                      {/* municipalities  */}
                      <Grid item xs={12} sm={12} md={6} mt={2}>
                        <InputLabel shrink htmlFor="municipalities">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <LocationCityIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Municipalities / Post Office
                            </Typography>
                          </Box>
                        </InputLabel>

                        {municipalities !== null ? (
                          <Select
                            id="municipalities"
                            value={selectedMunicipalitiesName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedMunicipalitiesName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Municipalities / Post Office
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px'
                            }}
                            fullWidth
                            size="small"
                            {...register("municipalities")}
                            variant="outlined"
                            onChange={(e) => {
                              let sd = municipalities?.find(
                                (dc) => dc.node?.id == e.target.value
                              );

                              setSelectedMunicipalities(e.target.value);
                              setSelectedMunicipalitiesName(sd?.node?.name);
                            }}
                            required
                          >
                            {municipalities.length > 0 ? (
                              municipalities?.map((municipalitie) => (
                                <MenuItem
                                  key={municipalitie.node?.id}
                                  value={municipalitie.node?.id}
                                >
                                  {municipalitie.node?.name}
                                </MenuItem>
                              ))
                            ) : (
                              <Typography
                                sx={{ textAlign: "center", ml: "15px" }}
                                variant="caption"
                              >
                                No Municipalities / Post Office Found
                              </Typography>
                            )}
                          </Select>
                        ) : (
                          <Select
                            id="municipalities"
                            value={selectedMunicipalitiesName}
                            displayEmpty
                            renderValue={(value) =>
                              value !== "" ? (
                                selectedMunicipalitiesName
                              ) : (
                                <Typography
                                  sx={{
                                    color: "#a1a1a1",
                                    fontSize:'12px'
                                  }}
                                >
                                  Municipalities / Post Office
                                </Typography>
                              )
                            }
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              fontSize:'12px',
                            }}
                            fullWidth
                            size="small"
                            variant="outlined"
                            required
                            disabled
                          >
                            {municipalities?.map((municipalitie) => (
                              <MenuItem
                                key={municipalitie.node?.id}
                                value={municipalitie.node?.id}
                              >
                                {municipalitie.node?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>

                      {/* address  */}
                      <Grid item xs={12} sm={12} md={12} mt={2}>
                        <InputLabel shrink htmlFor="email">
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography component="div">
                              <AddLocationAltIcon />
                            </Typography>

                            <Typography
                              sx={{ marginLeft: "5px" }}
                              component="div"
                            >
                              Address
                            </Typography>
                          </Box>
                        </InputLabel>

                        <OutlinedInput
                          sx={{ backgroundColor: "white", borderRadius: "3px",fontSize:'12px' }}
                          fullWidth
                          multiline={true}
                          rows="3"
                          size="small"
                          {...register("address")}
                          placeholder="address"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Paper sx={{ p: "10px", mt: "9px" }}>
                    <Box>
                      <Box sx={{ fontSize: "20px", padding: "14px 0px" }}>
                        <FontAwesomeIcon
                          icon={faReceipt}
                          style={{
                            color: "var(--primary)",
                          }}
                        />
                        <Typography
                          variant="p"
                          sx={{ ml: "6px", fontWeight: "300" }}
                        >
                          Billing Summary
                        </Typography>
                      </Box>

                      <Box sx={{ padding: "5px" }}>
                        {/* sub total  */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb:'4px'
                          }}
                        >
                          <Typography variant="subtitle2">Sub Total :</Typography>

                          <Typography variant="subtitle2"  sx={{fontWeight:'400'}}>
                            {cartItems?.country?.currenciesSymbol}{" "}
                            {totalCartAmoutInCheckoutPage.toFixed(2)}
                          </Typography>
                        </Box>

                        {/* sub total usd  */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                             mb:'4px'
                          }}
                        >
                          <Typography variant="subtitle2">
                            Sub Total (USD) :
                          </Typography>

                          <Typography variant="subtitle2"  sx={{fontWeight:'400'}}>
                            $ {totalCartAmoutUsdInCheckoutPage.toFixed(2)}
                          </Typography>
                        </Box>

                        {/* shipping  */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: "1px",
                            mb:'4px'
                          }}
                        >
                          <Typography variant="subtitle2">Shipping :</Typography>

                          <Typography variant="subtitle2"  sx={{fontWeight:'400'}}>
                            {cartItems?.country?.currenciesSymbol}{" "}
                            {shippingCost.toFixed(2)}
                          </Typography>
                        </Box>

                        {/* shipping usd  */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                             mb:'4px'
                          }}
                        >
                          <Typography variant="subtitle2">
                            Shipping (USD) :
                          </Typography>

                          <Typography variant="subtitle2" 
                          sx={{fontWeight:'400'}}
                          >
                            $ {shippingCostUsd.toFixed(2)}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                             mb:'4px'
                          }}
                        >
                          <Typography variant="subtitle2">
                            Payable Total :
                          </Typography>

                          <Typography variant="subtitle2" >
                            {cartItems?.country?.currenciesSymbol}{" "}
                            {(
                              totalCartAmoutInCheckoutPage + shippingCost
                            ).toFixed(2)}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb:'4px',
                          }}
                        >
                          <Typography variant="subtitle2">
                            Payable Total (USD) :
                          </Typography>

                          <Typography variant="subtitle2">
                            ${" "}
                            {(
                              totalCartAmoutUsdInCheckoutPage + shippingCostUsd
                            ).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>

                  {/* payment option  */}
                  <Paper sx={{ p: "10px", mt: "20px" }}>
                    <Box>
                      <Box sx={{ fontSize: "20px", padding: "14px 0px" }}>
                        <img
                          src="/images/credit-card.svg"
                          alt="credit"
                          height="25"
                        />
                        <Typography
                          variant="p"
                          sx={{ ml: "6px", fontWeight: "300" }}
                        >
                          Payment Option
                        </Typography>
                      </Box>

                      {/* bkash  */}
                      <Box>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentTypeState}
                            onChange={(e) => setPaymentTypeState(e.target.value)}
                          >
                            <FormControlLabel
                              className="payment_method"
                              value="bKash"
                              control={<Radio />}
                              label={
                                <Grid
                                  container
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={4}>
                                    <img
                                      src="/images/bkash.svg"
                                      alt="icon"
                                      height="30"
                                      style={{
                                        marginTop: "10px",
                                        marginRight: "10px",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Typography
                                      sx={{
                                        marginTop: "0px",
                                        marginLeft: "10px",
                                        fontSize: "15px",
                                      }}
                                    >
                                      bKash
                                    </Typography>
                                  </Grid>
                                </Grid>
                              }
                            />
                            <FormControlLabel
                              className="payment_method"
                              value="cash on delivery"
                              control={<Radio />}
                              label={
                                <Grid
                                  container
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={3}>
                                    <img
                                      src="/images/cash-on-delivery.png"
                                      alt="icon"
                                      height="22"
                                      style={{
                                        marginTop: "10px",
                                        marginRight: "10px",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={9} sx={{ flexGrow: 1 }}>
                                    <Typography
                                      style={{
                                        marginTop: "0px",
                                        fontSize: "15px",
                                      }}
                                    >
                                      Cash on Delevery
                                    </Typography>
                                  </Grid>
                                </Grid>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth={true}
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "var(--primary)",
                        my: "20px",
                      }}
                      endIcon={<ChevronRightIcon />}
                    >
                      Confirm Order
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const { cartItems } = useCartListOnServerSide(globalCookie);

  let newCartItems = await cartItems;

  return {
    props: {
      cartItems: newCartItems?.data?.me?.consumers,
    },
  };
};

export default Checkout;

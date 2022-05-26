import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "./DirectCommision.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useDetailsConsumer from "../../../../apolloClient/queries/consumer/EditConsumerQuery";

import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import useDirectCommisionSend from "../../../../apolloClient/mutation/commisions/DirectCommisionSend";
import { GET_DIRECT_COMMISION } from "../../../../apolloClient/queries/commision/GetDirectCommision";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CommisionCreate = ({ token, currentUser }) => {
  const router = useRouter();
  const { id } = router.query;

  const [sales, setSales] = useState("");
  const [givesAmt, setGivesAmt] = useState("");
  const [salesAmtInDollar, setSalesAmtInDollar] = useState("");
  const [giveAmtInDollar, setGiveAmtInDollar] = useState("");

  // Fetch consumer details and loggedin user details
  var { data: consumerData, loading: consumerLoading } = useDetailsConsumer(id);
  //Direct commison send controller

  const { directCommisionSendMutationHandler, data: commisionData } =
    useDirectCommisionSend();

  // Sales and gives amount handler
  const salesAmtHandler = (e) => {
    const sales = e.target.value;
    setSales(sales);
    const dollarAmt =
      sales * currentUser?.consumers?.country?.localOneCurrencyToUsd;
    setSalesAmtInDollar(dollarAmt);
  };
  const giveAmtHandler = (e) => {
    const giving_amt = e.target.value;
    setGivesAmt(giving_amt);
    const dollarAmt =
      giving_amt * currentUser?.consumers?.country?.localOneCurrencyToUsd;
    setGiveAmtInDollar(dollarAmt);
  };

  // Declare useForm including default values for storing into database
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit master register data
  const submitHandler = (data) => {
    console.log(data);

    directCommisionSendMutationHandler({
      variables: {
        sendingAmt: data.giving_amt,
        totalSellAmt: data.sales_amt,
        consumerReceiverId: consumerData?.consumer?.id,
        productDetails: data.product_details,
      },
      refetchQueries: [{ query: GET_DIRECT_COMMISION }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        console.log("on completed");
        router.push("/consumer-dashboard/commisions/directcommision/payment");
        toast.success("Commision has been sent successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        reset({
          sales_amt: "",
          giving_amt: "",
          product_details: "",
        });
      },
      onError: (err) => {
        toast.warn("Commision is not sent!", {
          position: "top-center",
          autoClose: 3000,
        });
        console.log("please input valid value :: ", err);
      },
    });
  };

  const onError = (err) => {
    console.log("err", err);
  };
  if (consumerLoading) {
    return <div>Loading...</div>;
  }

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
        Send Direct Commisssion
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <div>
        <form
          onSubmit={handleSubmit(submitHandler, onError)}
          className={styles.columnSpace}
        >
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Receiver Information
                </Typography>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={1} rowSpacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever Name*"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={
                          consumerData?.consumer?.user?.firstName +
                          " " +
                          consumerData?.consumer?.user?.lastName
                        }
                        name="receiver_name"
                        {...register("receiver_name", {
                          required: true,
                        })}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever CIN*"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={consumerData?.consumer?.username}
                        name="receiver_cin"
                        {...register("receiver_cin", {
                          required: true,
                        })}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever Phone No*"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={
                          consumerData?.consumer?.callingCode +
                          consumerData?.consumer?.callingCode
                        }
                        name="receiver_phoneno"
                        {...register("receiver_phoneno", {
                          required: true,
                        })}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever Gender"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={consumerData?.consumer?.gender}
                        name="receiver_gender"
                        {...register("receiver_gender", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever Country"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={
                          consumerData?.consumer?.consumeraddresses?.country
                            ?.name
                        }
                        name="receiver_country"
                        {...register("receiver_country")}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever Division/State"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={
                          consumerData?.consumer?.consumeraddresses
                            ?.divisionOrState?.name
                        }
                        name="receiver_division"
                        {...register("receiver_division")}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label=" Reciever District/City"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={
                          consumerData?.consumer?.consumeraddresses
                            ?.districtOrCity?.name
                        }
                        name="receiver_district"
                        {...register("receiver_district")}
                      />
                    </Grid>
                  </Grid>
                </Item>
              </Grid>

              {/*Sender Information section*/}
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Sender Information
                </Typography>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={1} rowSpacing={2}>
                    <Grid item xs={12} md={12} sx={{ marginTop: "0px" }}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Sender Name*"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        inputProps={{ readOnly: true }}
                        sx={{ background: "#f7f7f7" }}
                        defaultValue={
                          currentUser?.firstName + " " + currentUser?.lastName
                        }
                        name="sender_name"
                        {...register("sender_name", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Sender CIN*"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        defaultValue={currentUser?.username}
                        sx={{ background: "#f7f7f7" }}
                        inputProps={{ readOnly: true }}
                        name="sender_cin"
                        {...register("sender_cin", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Sender Email"
                        //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        defaultValue={currentUser?.email}
                        sx={{ background: "#f7f7f7" }}
                        inputProps={{ readOnly: true }}
                        name="sender_email"
                        {...register("sender_email", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Total Sales Amount*"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            name="sales_amt"
                            value={sales}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {
                                    currentUser?.consumers?.country
                                      ?.currenciesSymbol
                                  }
                                </InputAdornment>
                              ),
                            }}
                            {...register("sales_amt", {
                              required: true,
                            })}
                            onChange={salesAmtHandler}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Total Sales Amount*"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            value={salesAmtInDollar}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  {"$"}
                                </InputAdornment>
                              ),
                            }}
                            name="sales_amt"
                            //{...register("sales_amt")}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Giving Amount*"
                            name="giving_amt"
                            value={givesAmt}
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {
                                    currentUser?.consumers?.country
                                      ?.currenciesSymbol
                                  }
                                </InputAdornment>
                              ),
                            }}
                            {...register("giving_amt", {
                              required: true,
                            })}
                            onChange={giveAmtHandler}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Giving Amount*"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            name="giving_amt"
                            value={giveAmtInDollar}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  {"$"}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Product Details*"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        name="product_details"
                        {...register("product_details", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        className={styles.saveButton}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};

export default withConsumerAuth(CommisionCreate);

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

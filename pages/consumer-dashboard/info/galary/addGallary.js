import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import useCreategallary from "../../../../apolloClient/mutation/history/create";
import { GET_COUNTRIES } from "../../../../apolloClient/queries/allCountryQuery";
import client from "../../../../apolloClient/configuration/apolloConfig";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const addGallary = ({ token, currentUser, countries }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
   const [countryId, setCountryId] = useState("");
  const router = useRouter();

  const {historicalSliderCreateOrUpdate } = useCreategallary();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Image Preview code
  const handleImageChange = (event) => {
    setImagePreview(event.target.files[0]);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };


  // Submit slider update data
  const submitHandler = (data) => {


    const formData = new FormData();
    for (let i in data) {
      if (i === "image") {
        if (imagePreview !== null) {
          formData.append(i, imagePreview, imagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else {
        formData.append(i, data[i]);
      }
    }

    let dataToUpdate = Object.fromEntries(
      Object.entries(Object.fromEntries(formData)).filter(([_, v]) => v != "")
    );


    historicalSliderCreateOrUpdate({
      variables: {
        ...dataToUpdate,
        countryId:countryId,
        youtubeLink:formData.get("youtubelink"),
        isActive: formData.get("isActive") === "true" ? true : false,
        
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
          router.push("/consumer-dashboard/info/galary");
        }, 3000);
      },
      onError: (err) => {
        alert(err);
      },

   
    });


  };
  return(
    <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Gallary Added successfully!
        </Alert>
      </Snackbar>

      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={6}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
     
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              placeholder="Enter Title"
              name="title"
              {...register("title", {
                required: true,
              })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
      
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              placeholder="Enter description"
              name="description"
              {...register("description")}
            />
          </FormControl>
        </Grid>

        {/* you tube link  */}

        <Grid item xs={12} sm={6}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
        
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              placeholder="Enter youtube link"
              name="youtubelink"
              {...register("youtubelink")}
            />
          </FormControl>
        </Grid>

        {/* select the country  */}
           

        <Grid item xs={12} sm={6}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
         
          </InputLabel>
              <FormControl fullWidth>
        
               <Autocomplete
                  sx={{ mt: 2 }}
                  id="size-small-outlined"
                  options={countries?.edges}
                  getOptionLabel={(option) =>
                    option ? option?.node?.name : ""
                  }
                  //defaultValue={countryData?.continent?.countries?.edges[0]}
                  name="country"
                  onChange={(event, value) => setCountryId(value?.node?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Origin Country"
                      placeholder="Select country"
                    />
                  )}
                />
              </FormControl>
        </Grid>


       {/* active status  */}


        <Grid item xs={12} sm={6}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
          
          </InputLabel>
          <RadioGroup row defaultValue={true} name="isActive">
            <FormControlLabel
              {...register("isActive", {
                required: true,
              })}
              value={true}
              control={<Radio />}
              label="True"
            />
            <FormControlLabel
              {...register("isActive", {
                required: true,
              })}
              value={false}
              control={<Radio />}
              label="False"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div
            style={{
              border: "1px solid #000",
              height: "140px",
              width: "120px",
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
              <img src={"/images/selectImage.jpg"} width="120" height="140" />
            )}
          </div>
          <label htmlFor="contained-button-file">
            <Input
              name="image"
              {...register("image", {
                required: true,
              })}
              accept="image/*"
              onChange={handleImageChange}
              id="contained-button-file"
              multiple
              type="file"
            />
          </label>
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: 2 }} type="submit">
        Save
      </Button>
    </Box>
  )

};

export default withConsumerAuth(addGallary);


export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";
  const { data } = await client.query({ query: GET_COUNTRIES });
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
      countries: data.countries,
    },
  };
};

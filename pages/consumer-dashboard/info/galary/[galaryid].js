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
import client from "../../../../apolloClient/configuration/apolloConfig";

import useUpdateGallary from "../../../../apolloClient/mutation/history/update";
import useSingleGallary from "../../../../apolloClient/queries/historicalGallary/singleHistoricalGalleryQuery";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const editGallary = ({ token, currentUser, countries }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const { galaryid } = router.query;

  const { data: galaryData, loading: galaryLoading } =
    useSingleGallary(galaryid);

  console.log("data kis assse :: ", galaryData);

  const { historicalSliderCreateOrUpdate } = useUpdateGallary();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (galaryLoading) {
    return <p>Please wait..</p>;
  }

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
    formData.append("id", galaryid);
    for (let i in data) {
      if (i === "image") {
        if (imagePreview !== null) {
          formData.append(i, imagePreview, imagePreview.name);
        } else {
          formData.delete(i);
        }
      } else {
        formData.append(i, data[i]);
      }
    }

    //this code is used for converting formdata to object
    /*
    let dataToUpdate = Object.fromEntries(
      Object.entries(Object.fromEntries(formData)).filter(([_, v]) => v != "")
    ); */

    historicalSliderCreateOrUpdate({
      variables: {
        ...Object.fromEntries(formData),
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

  return (
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
          Slider updated successfully!
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
            Title
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              defaultValue={galaryData.historicalSlider.title}
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
            Active
          </InputLabel>
          <RadioGroup
            row
            defaultValue={galaryData.historicalSlider.isActive}
            name="isActive"
          >
            <FormControlLabel
              {...register("isActive")}
              value={true}
              control={<Radio />}
              label="True"
            />
            <FormControlLabel
              {...register("isActive")}
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
              <img
                src={galaryData?.historicalSlider?.image}
                width="120"
                height="140"
              />
            )}
          </div>
          <label htmlFor="contained-button-file">
            <Input
              name="image"
              {...register("image")}
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
  );
};

export default withConsumerAuth(editGallary);

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

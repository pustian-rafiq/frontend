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
  OutlinedInput,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import useProductsName from "../../../../apolloClient/queries/products/productsName";
import useCreateSlider from "../../../../apolloClient/mutation/slider/createSlider";
import useCreateSliderNotice from "../../../../apolloClient/mutation/noticeSlider/createSlider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NoticeAdd = ({ token, currentUser, productsName }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();

  const { sliderNotificationCreateOrUpdate } = useCreateSliderNotice();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  // Submit slider update data
  const submitHandler = (data) => {
   
    sliderNotificationCreateOrUpdate({
      variables: {
        ...data,
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
          router.push("/admin-dashboard/media-info/notice/notices");
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
          Notice Added successfully!
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
            Add Link/SubTitle
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              placeholder="Enter link/subtitle"
              name="link"
              {...register("link", {
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

       
      </Grid>
      <Button variant="contained" sx={{ mt: 2 }} type="submit">
        Save
      </Button>
    </Box>
  );
};

export default withAdminAuth(NoticeAdd);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const data = await useProductsName();

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
      token: getSessionCookie,
      currentUser: getUser,
      productsName: data.data.products.edges,
    },
  };
};


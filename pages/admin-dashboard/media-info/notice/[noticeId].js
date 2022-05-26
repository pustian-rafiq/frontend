

import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Snackbar
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import updateSliderNotice from "../../../../apolloClient/mutation/noticeSlider/updateSliderNotices";
import useSingleSliderNotice from "../../../../apolloClient/queries/sliderNotice/singleNoticeSlider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const editSliderNotice = ({ token }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const { noticeId } = router.query;

  const { data: sliderData, loading: sliderLoading } =
    useSingleSliderNotice(noticeId);

    // console.log('sliderData',sliderData);
    // console.log('sliderId',noticeId);

  const { sliderNotificationCreateOrUpdate } =  updateSliderNotice()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (sliderLoading) {
    return <p>Please wait..</p>;
  }

 

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  // Submit slider update data
  const submitHandler = (data) => {
   

    const formData = new FormData();
     console.log('list data',formData.get("title"))

    sliderNotificationCreateOrUpdate({
      variables: {
         ...data,
         id:noticeId,
        // title:formData.get("title"),
        // link:formData.get("link"),
        // isActive: formData.get("isActive") === "true" ? true : false,
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
          Notice updated successfully!
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
              defaultValue={sliderData?.sliderNotification?.title}
              placeholder="Enter Title"
              name="title"
              {...register("title")}
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
            Link
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              defaultValue={sliderData?.sliderNotification?.link}
              placeholder="Link"
              name="link"
              {...register("link")}
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
            defaultValue={sliderData?.sliderNotification?.isActive}
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


      </Grid>
      <Button variant="contained" sx={{ mt: 2 }} type="submit">
        Save
      </Button>
    </Box>
  );
};

export default withAdminAuth(editSliderNotice);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

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

    },
  };
};

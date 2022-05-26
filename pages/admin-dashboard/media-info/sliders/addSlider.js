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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const addSlider = ({ token, currentUser, productsName }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();

  const { sliderCreateOrUpdate } = useCreateSlider();

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
    const productId = data.productName
      ? productsName.find((product) => product.node.name === data.productName)
          ?.node?.id
      : productsName.find(
          (product) => product.node.name === sliderData.slider.product.name
        )?.node?.id;

    const formData = new FormData();
    formData.append("productId", productId);
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

    sliderCreateOrUpdate({
      variables: {
        ...dataToUpdate,
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
          router.push("/admin-dashboard/media-info/sliders/sliderList");
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
          Slider Added successfully!
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
            Product
          </InputLabel>
          <Autocomplete
            // disablePortal
            fullWidth
            // defaultValue={}
            id="combo-box-demo"
            options={productsName}
            getOptionLabel={(option) => (option ? option?.node?.name : "")}
            sx={{ background: "#ffffff" }}
            // onChange={(event, value) => setProductName(value?.node?.name)}
            renderInput={(params) => (
              <TextField
                {...register("productName", {
                  required: true,
                })}
                {...params}
                placeholder="Select Product"
              />
            )}
          />
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
  );
};

export default withAdminAuth(addSlider);

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

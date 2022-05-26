import React, { useState } from "react";
import AdminDashboardLayout from "../../../components/Dashboard/AdminDashboard/AdminDashboardLayout";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import styles from "../../../components/Dashboard/AdminDashboard/AdminDashboard.module.css";
import TextField from "@mui/material/TextField";
//import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import useIncentiveMutation from "../../../apolloClient/mutation/incentive/IncentiveMutation";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const AddIncentives = ({ token, currentUser }) => {
  // Image Preview code
  const [imagePreview, setImagePreview] = useState({ file: null });
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  const { incentiveMutationHandler, loading, error, data } =
    useIncentiveMutation();

  // Incentive submit handler
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);

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

    incentiveMutationHandler({
      variables: {
        subCategory: formData.get("sub_category_name"),
        slug: slug,
        category: categoryId?.node?.id,
        photo: formData.get("photo"),
      },
      context: {
        headers: {
          Authorization: `JWT ${getSessionCookie}`,
        },
      },
      refetchQueries: [GET_SUBCATEGORIES],

      onCompleted: () => {
        router.push("/admin-dashboard/inventory/subCategory");
        setOpen(true);
        setTimeout(() => {
          reset({
            category: "",
            slug: "",
            subCategory: "",
          });
          setOpen(false);
        }, 5000);
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        setTimeout(() => {
          setIsError(true);
        }, 5000);
      },
    });
  };

  return (
    <>
      <div className="paymentTitle">
        <span>Add New Incentives</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form
          className={styles.columnSpace}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={4}>
              <Grid item md={12}>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={3}>
                    {/* Left Column of the form*/}
                    <Grid item xs={12} md={4} className={styles.rowSpace}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Name"
                        name="name"
                        {...register("name", {
                          required: true,
                        })}
                      />
                      <Typography sx={{ color: "#E75C33" }}>
                        {errors.name &&
                          errors.name.type === "required" &&
                          "You must have name"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className={styles.rowSpace}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Icon"
                        name="icon"
                        {...register("icon")}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className={styles.rowSpace}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Number"
                        name="number"
                        {...register("number")}
                      />
                    </Grid>
                    <Grid item xs={12} md={8} className={styles.rowSpace}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Note"
                        name="note"
                        {...register("note")}
                      />
                    </Grid>

                    <Grid item xs={12} md={2} className={styles.rowSpace}>
                      <div
                        style={{
                          border: "1px solid #000",
                          height: "80px",
                          width: "80px",
                          marginBottom: "10px",
                        }}
                      >
                        {imagePreview.file ? (
                          <img
                            src={imagePreview.file}
                            width="80"
                            height="80"
                          />
                        ) : (
                          <img
                            src="/images/profile-picture.jpg"
                            width="80"
                            height="80"
                          />
                        )}
                      </div>
                      <label htmlFor="contained-button-file">
                        <Input
                          name="logo"
                          {...register("logo")}
                          accept="image/*"
                          onChange={handleChange}
                          id="contained-button-file"
                          multiple
                          type="file"
                        />
                        <Button
                          component="span"
                          sx={{
                            background: "#152313",
                            color: "white",
                            textTransform: "capitalize",
                            ":hover": {
                              background: "#42563F",
                            },
                          }}
                        >
                          Upload Logo
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} md={2} className={styles.rowSpace}>
                      <Button
                        type="submit"
                        sx={{
                          background: "#20C20C",
                          color: "white",
                          textTransform: "capitalize",
                          ":hover": {
                            background: "#0B4A02",
                          },
                        }}
                      >
                        Save Incentives
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
export default withAdminAuth(AddIncentives);

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

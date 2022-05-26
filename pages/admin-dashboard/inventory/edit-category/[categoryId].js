import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import AdminDashboardLayout from "../../../../components/Dashboard/AdminDashboard/AdminDashboardLayout";
import { useRouter } from "next/router";
import useEditCategory from "../../../../apolloClient/queries/inventory/EditCategoryQuery";
import { useForm } from "react-hook-form";
import useUpdateCategory from "../../../../apolloClient/mutation/inventory/UpdateCategoryMutation";
import CloseIcon from "@mui/icons-material/Close";
import { GET_CATEGORIES } from "../../../../apolloClient/queries/inventory/CategoryQuery";
import getCookie from "../../../../utils/getCookie";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../../utils/getCurrentUser";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Input = styled("input")({
  display: "none",
});
const EditCategory = ({ token, currentUser }) => {
  const [slug, setSlug] = useState("")

  const router = useRouter();
  const { categoryId } = router.query;
  const { data: categoryData, loading: categoryLoading } =
    useEditCategory(categoryId);
  const {
    categoryMutationHandler,
    loading: categoryUpdateLoading,
    error: categoryUpdateError,
  } = useUpdateCategory();

  // const [categoryName, setCategoryName] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("categoryData", categoryData);

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };

  if (categoryLoading) {
    return <div>Loading data....</div>;
  }

  const categoryHandler = (e) => {
    // setCategoryName(e.target.value)
    const category = e.target.value;
    const slug = category
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
  };
  // Edit category form handler
  const onSubmit = (data) => {
    console.log("data", data);

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
    // Update category with and without image
    if (imagePreview) {
      var updateWithImage = {
        id: categoryData?.category?.id,
        name: formData.get("category_name"),
        slug: slug,
        icon: formData.get("icon"),
        photo: formData.get("photo"),
      }
    } else {
      var updateWithoutImage = {
        id: categoryData?.category?.id,
        name: formData.get("category_name"),
        slug: slug,
        icon: formData.get("icon"),
      }
    }
    categoryMutationHandler({
      variables: updateWithImage? updateWithImage : updateWithoutImage,
      refetchQueries: [{ query: GET_CATEGORIES }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        toast.success('Category updated successfully!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn('Something went wrong!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      },
    });

    if (!categoryUpdateLoading && !categoryUpdateError) {
      router.push("/admin-dashboard/inventory/category");
    } else {
      alert(vatUpdateError);
    }
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1, maxWidth: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >

        <Grid container spacing={2} columnSpacing={3}>
          <Grid item md={12}>
            <Item>
              <Button
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  mb: 1,
                  textTransform: "capitalize",
                }}
                variant="contained"
                startIcon={<ArrowBackIcon />}
              >
                <Link href="/admin-dashboard/inventory/category/">Back</Link>
              </Button>
              <Typography
                sx={{
                  pb: 5,
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "center",
                  color: "#777779",
                }}
              >
                Update Category
              </Typography>
              <Grid container spacing={2} columnSpacing={3}>
                <Grid item md={2}></Grid>
                <Grid item md={6}>
                  <Grid container spacing={1} rowSpacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Category Name"
                        defaultValue={categoryData?.category?.name}
                        {...register("category_name", {
                          required: true,
                        })}
                        onChange={categoryHandler}
                      />
                      <Typography sx={{ color: "#E75C33" }}>
                        {errors.category_name &&
                          errors.category_name.type === "required" &&
                          "You must have category name"}
                      </Typography>
                    </Grid>

                    {slug ? (
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Slug (category-slug-name)"
                          value={slug && slug}
                          InputProps={{ readOnly: true }}
                          sx={{ background: "#F5F5F5" }}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Slug (category-slug-name)"
                          defaultValue={categoryData?.category?.slug}
                          InputProps={{ readOnly: true }}
                          sx={{ background: "#F5F5F5" }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Fontawesome Icon (fa fa-cog)"
                        name="icon"
                        defaultValue={categoryData?.category?.icon}
                        {...register("icon", {
                          // required: true,
                        })}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={4}>
                  <Grid container spacing={1} rowSpacing={2}>
                    <Grid item xs={12} md={4}>
                      <div
                        style={{
                          border: "1px solid #000",
                          height: "102px",
                          width: "102px",
                          marginBottom: "10px",
                        }}
                      >
                        {imagePreview ? (
                          <img
                            src={URL.createObjectURL(imagePreview)}
                            width="100"
                            height="100"
                          />
                        ) : (
                          // <img src="/images/profile-picture.jpg" width="100" height="100" />
                          <img
                            src={categoryData?.category?.image}
                            width="100"
                            height="100"
                          />
                        )}
                      </div>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          //defaultValue={categoryData?.category?.image}
                          {...register("photo")}
                          onChange={handleChange}
                        />
                        <Button
                          component="span"
                          sx={{
                            background: "#31b0d5",
                            color: "white",
                            mt: 1,
                            textTransform: "capitalize",
                            width: "180px",
                            ":hover": {
                              background: "#42563F",
                            },
                          }}
                        >
                          Upload Category Photo
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={2}>
                  {" "}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    type="submit"
                    sx={{
                      background: "#31b0d5",
                      color: "white",
                      textTransform: "capitalize",
                      ":hover": {
                        background: "#6563ef",
                      },
                    }}
                  >
                    Update Category
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default withAdminAuth(EditCategory);

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

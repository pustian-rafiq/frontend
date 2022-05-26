import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import useCategoryMutation from "../../../../../apolloClient/mutation/inventory/CategoryMutation";
import { GET_CATEGORIES } from "../../../../../apolloClient/queries/inventory/CategoryQuery";
import { useRouter } from "next/router";
import {toast} from 'react-toastify'

const Input = styled("input")({
  display: "none",
});

const AddCategory = ({ getSessionCookie }) => {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const { categoryMutationHandler, loading, error, data } =
    useCategoryMutation();

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const categoryHandler = (e) => {
    const category = e.target.value;
    const slug = category
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
  };
  const onSubmit = (data) => {
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

    categoryMutationHandler({
      variables: {
        name: formData.get("category_name"),
        slug: slug,
        icon: formData.get("icon"),
        photo: formData.get("photo"),
      },
      refetchQueries: [{ query: GET_CATEGORIES }],
      context: {
        headers: {
          Authorization: `JWT ${getSessionCookie}`,
        },
      },

      onCompleted: () => {
        console.log("on completed");
        router.push("/admin-dashboard/inventory/category");
        toast.success('Category added successfully!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
       
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn('Category not added!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      },
    });
  };

  return (
    <>
      <Typography
        sx={{
          pb: 1,
          fontWeight: "bold",
          fontSize: "20px",
          textAlign: "center",
          color: "#777779",
        }}
      >
        Create New Category
      </Typography>
      <Box
        sx={{ flexGrow: 1, maxWidth: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                  name="category_name"
                  {...register("category_name", { required: true })}
                  onChange={categoryHandler}
                />
                <Typography sx={{ color: "#E75C33" }}>
                  {errors.category_name &&
                    errors.category_name.type === "required" &&
                    "You must have category name"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Slug (category-slug-name)"
                  InputProps={{ readOnly: true }}
                  sx={{ background: "#F5F5F5" }}
                  value={slug}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Fontawesome Icon (fa fa-cog)"
                  {...register("icon")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container spacing={1} rowSpacing={2}>
              <Grid item xs={12} md={4}>
                <Box
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
                    <img
                      src="/images/icon1.jpg"
                      width="100"
                      height="100"
                    />
                  )}
                </Box>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="photo"
                    {...register("photo")}
                    onChange={handleChange}
                  />
                  <Button
                    component="span"
                    sx={{
                      background: "#152313",
                      color: "white",
                      mt: 1,
                      textTransform: "capitalize",
                      width: "120px",
                      ":hover": {
                        background: "#42563F",
                      },
                    }}
                  >
                    Category Photo
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
                background: "#20C20C",
                color: "white",
                textTransform: "capitalize",
                ":hover": {
                  background: "#0B4A02",
                },
              }}
            >
              Save Category
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddCategory;

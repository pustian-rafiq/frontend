import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import useSubsubCategoryMutation from "../../../../../apolloClient/mutation/inventory/SubsubCategoryMutation";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

const AddSubSubCategory = ({ subCategories, getSessionCookie }) => {
const router = useRouter()
  const [category, setCategory] = useState("")
  const [slug, setSlug] = useState("")

  const { subsubCategoryMutationHandler, loading, error, data } =
    useSubsubCategoryMutation();


  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0])
  };

  // Create slug for sub sub-category
  const subSubCategoryHandler = (e) => {
    const category = e.target.value;
    const slug = category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setSlug(slug)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Sub-sub-category submit handler
  const onSubmit = (data) => {
    console.log(data);
    const categoryId = subCategories.find((datas) => {
      return datas.node.id === category
    })

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

    subsubCategoryMutationHandler({
      variables: {
        name: formData.get("sub_sub_category_name"),
        slug: slug,
        subCategoryId: categoryId?.node?.id,
        photo: formData.get("photo"),
      },
      context: {
        headers: {
          Authorization: `JWT ${getSessionCookie}`,
        },
      },
   
      onCompleted: () => {
       Router.push("/admin-dashboard/inventory/subSubCategory")
 
       toast.success('Sub sub-category added successfully!', {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
        setSlug("")
          reset({
            sub_sub_category_name: "",
            slug: "",
            subCategoryId: "",
          })
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn('Sub-sub-category not added!', {
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
        Create new Subsub-category
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
                  label="Sub Sub Category Name"
                  {...register("sub_sub_category_name", { required: true })}
                  onChange={subSubCategoryHandler}
                />
                <Typography sx={{ color: '#E75C33' }} >
                  {errors.sub_sub_category_name && errors.sub_sub_category_name.type === "required" && "You must have sub-category"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  value={slug}
                  label="Slug (sub-sub-category-slug-name)"
                  inputProps={
                    { readOnly: true }
                  }
                  sx={{ background: '#F5F5F5' }}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={subCategories}
                  getOptionLabel={(option) => option?.node?.name}
                  // defaultValue={categoryList[0]}
                  onChange={(event, value) => setCategory(value?.node?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select SubCategory"
                      placeholder="Select SubCategory"
                      {...register("sub_category", { required: true })}
                    />
                  )}
                />
                <Typography sx={{ color: '#E75C33' }} >
                  {!errors.sub_sub_category_name && errors.sub_category && errors.sub_category.type === "required" && "You must have select sub-category"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container spacing={1} rowSpacing={2}>
              <Grid item xs={12} md={4}>
                <Typography
                  style={{
                    border: "1px solid #000",
                    height: "102px",
                    width: "102px",
                    marginBottom: "10px",
                  }}
                >
                  {imagePreview ? (
                    <img src={URL.createObjectURL(imagePreview)} width="100" height="100" />
                  ) : (
                    <img
                      src="/images/profile-picture.jpg"
                      width="100"
                      height="100"
                    />
                  )}
                </Typography>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
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
                      width: "180px",
                      ":hover": {
                        background: "#42563F",
                      },
                    }}
                  >
                    Sub Sub-Category Photo
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

export default AddSubSubCategory;



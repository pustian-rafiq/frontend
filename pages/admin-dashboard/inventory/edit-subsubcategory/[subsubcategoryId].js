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
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { GET_SUBCATEGORIES } from "../../../../apolloClient/queries/inventory/SubCategoryQuery";
import client from "../../../../apolloClient/configuration/apolloConfig";
import useEditSubSubCategory, {
  GET_SUB_SUBCATEGORY,
} from "../../../../apolloClient/queries/inventory/EditSubSubCategoryQuery";
import { useRouter } from "next/router";
import getCookie from "../../../../utils/getCookie";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import useUpdateSubSubCategory from "../../../../apolloClient/mutation/inventory/UpdateSubSubCategory";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../../utils/getCurrentUser";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Input = styled("input")({
  display: "none",
});

const EditSubSubCategory = ({ subCategories, token, currentUser }) => {

  const [slug, setSlug] = useState("");

  const router = useRouter();
  const { subsubcategoryId } = router.query;
  const { data: subSubCategoryData, loading: subsubCategoryLoading } =
    useEditSubSubCategory(subsubcategoryId);
  const [subCategory, setSubCategory] = useState();

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };

 
  const {
    subSubCategoryMutationHandler,
    loading: subSubCategoryUpdateLoading,
    error: subSubCategoryUpdateError,
  } = useUpdateSubSubCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Create slug from sub category name
  const categoryHandler = (e) => {
    const category = e.target.value;
    const slug = category
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
  };

  // Edit category form handler
  const onSubmit = (data) => {

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
    // Update sub sub-category with and without image
    if (imagePreview) {
      var updateWithImage = {
        id: subSubCategoryData?.subSubCategory?.id,
        name: formData.get("subSubcategory_name"),
        subCategoryId: subCategory ? subCategory : subSubCategoryData?.subSubCategory?.subCategory?.id,
        slug: slug,
        photo: formData.get("photo"),
      }
    } else {
      var updateWithoutImage = {
        id: subSubCategoryData?.subSubCategory?.id,
        name: formData.get("subSubcategory_name"),
        subCategoryId: subCategory ? subCategory : subSubCategoryData?.subSubCategory?.subCategory?.id,
        slug: slug,
      }
    }
    subSubCategoryMutationHandler({
      variables: updateWithImage ? updateWithImage : updateWithoutImage,
      refetchQueries: [{ query: GET_SUB_SUBCATEGORY }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        toast.success('Sub sub-category updated successfully!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
        router.push("/admin-dashboard/inventory/subSubCategory");
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn('Sub sub-category not updated!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      },
    });

    if (!subSubCategoryUpdateLoading && !subSubCategoryUpdateError) {
      // router.push("/admin-dashboard/inventory/subSubCategory")
    } else {
      alert(vatUpdateError);
    }
  };

  // If we don't use this loading, updated data don't show
  if (subsubCategoryLoading) {
    return <div>Loading data....</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container spacing={2} columnSpacing={3}>
            <Grid md={12}>
              <Item>
                <Typography
                  sx={{
                    pb: 5,
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                    color: "#777779",
                  }}
                >
                  Update Sub-category
                </Typography>
                <Grid container spacing={2} columnSpacing={3}>
                  <Grid md={2}></Grid>
                  <Grid item md={6}>
                    <Grid container spacing={1} rowSpacing={2}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Sub Sub-Category Name"
                          defaultValue={
                            subSubCategoryData?.subSubCategory?.name
                          }
                          {...register("subSubcategory_name", {
                            required: true,
                          })}
                          onChange={categoryHandler}
                        />
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
                            defaultValue={
                              subSubCategoryData?.subSubCategory?.slug
                            }
                            InputProps={{ readOnly: true }}
                            sx={{ background: "#F5F5F5" }}
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} md={12}>
                        <Autocomplete
                          id="size-small-outlined"
                          size="small"
                          options={subCategories}
                          getOptionLabel={(option) => option?.node?.name}
                          defaultValue={subCategories.find(
                            (cat) =>
                              cat.node.name ===
                              subSubCategoryData?.subSubCategory?.subCategory
                                ?.name
                          )}
                          onChange={(event, value) =>
                            setSubCategory(value?.node?.id)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...register("subcategory")}
                              {...params}
                              label="Sub-Category"
                              placeholder="Select Sub-Category"
                            />
                          )}
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
                            // <img src="/images/profile-picture.jpg" width="150" height="150" />
                            <img
                              src={subSubCategoryData?.subSubCategory?.image}
                              width="100"
                              height="100"
                            />
                          )}
                        </div>
                        <label htmlFor="contained-button-file">
                          <Input
                            {...register("photo")}
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
                              mt: 1,
                              textTransform: "capitalize",
                              width: "180px",
                              ":hover": {
                                background: "#42563F",
                              },
                            }}
                          >
                            Sub-category Photo
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
                      Update Sub-Sub-category
                    </Button>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default withAdminAuth(EditSubSubCategory);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({
    query: GET_SUBCATEGORIES,
    fetchPolicy: "network-only",
    // custom header for every request
    context: {
      headers: {
        Authorization: `JWT ${getSessionCookie}`,
      },
    },
  });

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
      subCategories: data.subCategories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

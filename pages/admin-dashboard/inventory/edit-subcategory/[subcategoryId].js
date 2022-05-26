import AdminDashboardLayout from "../../../../components/Dashboard/AdminDashboard/AdminDashboardLayout";

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
import { GET_CATEGORIES } from "../../../../apolloClient/queries/inventory/CategoryQuery";
import client from "../../../../apolloClient/configuration/apolloConfig";
import getCookie from "../../../../utils/getCookie";
import { useRouter } from "next/router";
import useEditSubCategory from "../../../../apolloClient/queries/inventory/EditSubCategoryQuery";
import useUpdateSubCategory from "../../../../apolloClient/mutation/inventory/UpdateSubCategoryMutation";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { GET_SUBCATEGORIES } from "../../../../apolloClient/queries/inventory/SubCategoryQuery";
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

const EditSubCategory = ({ categories, token, currentUser }) => {
  const [slug, setSlug] = useState("");

  const router = useRouter();
  const { subcategoryId } = router.query;

  const { data: subCategoryData, loading: subCategoryLoading } =
    useEditSubCategory(subcategoryId);

  const [category, setCategory] = useState("");

  useEffect(() => {
    setCategory(subCategoryData?.subCategoryData?.category?.id);
  }, [subCategoryData]);

  //sucategory update mutation 
  const {
    subCategoryUpdateMutationHandler,
    loading: subCategoryUpdateLoading,
    error: subCategoryUpdateError,
  } = useUpdateSubCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { categoryId: category } });

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
    const categoryId = categories.find((datas) => {
      return datas.node.id === category;
    });
    // console.log("id", categoryId)
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

  // Update sub-category with and without image
  if (imagePreview) {
    var updateWithImage =  {
      id: subCategoryData?.subCategory?.id,
      name: formData.get("subcategory_name"),
      categoryId: category ? category :  subCategoryData?.subCategory?.category?.id,
      slug: slug,
      photo: formData.get("photo"),
    }
  } else {
    var updateWithoutImage = {
      id: subCategoryData?.subCategory?.id,
      name: formData.get("subcategory_name"),
      categoryId: category ? category :  subCategoryData?.subCategory?.category?.id,
      slug: slug,
    }
  }
    subCategoryUpdateMutationHandler({
      variables: updateWithImage? updateWithImage : updateWithoutImage,
      refetchQueries: [{ query: GET_SUBCATEGORIES }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        toast.success('Sub-category updated successfully!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      },
      onError: (err) => {
          toast.warn('Sub-category not updated!', {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      },
    });

    if (!subCategoryUpdateLoading && !subCategoryUpdateError) {
      router.push("/admin-dashboard/inventory/subCategory");
    }  
  };

  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    setImagePreview(event.target.files[0]);
  };
  // If we don't use this loading, updated data don't show
  if (subCategoryLoading) {
    return <div>Loading data....</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Grid container spacing={2} columnSpacing={3}>
            <Grid item md={12}>
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
                          label="Sub Category Name"
                          defaultValue={subCategoryData?.subCategory?.name}
                          {...register("subcategory_name", {
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
                            defaultValue={subCategoryData?.subCategory?.slug}
                            InputProps={{ readOnly: true }}
                            sx={{ background: "#F5F5F5" }}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12} md={12}>
                        <Autocomplete
                          id="size-small-outlined"
                          size="small"
                          options={categories}
                          getOptionLabel={(option) => option?.node?.name}
                          defaultValue={categories.find(
                            (cat) =>
                              cat.node.name ===
                              subCategoryData?.subCategory?.category?.name
                          )}
                          onChange={(event, value) =>
                            setCategory(value?.node?.id)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...register("category")}
                              {...params}
                              label="Select Category"
                              placeholder="Select Category"
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
                            //  <img src="/images/profile-picture.jpg" width="150" height="150" />
                            <img
                              src={subCategoryData?.subCategory?.image}
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
                            //defaultValue={subCategoryData?.subCategory?.name}
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
                      Update Sub-category
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

export default withAdminAuth(EditSubCategory);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({
    query: GET_CATEGORIES,
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
      categories: data.categories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

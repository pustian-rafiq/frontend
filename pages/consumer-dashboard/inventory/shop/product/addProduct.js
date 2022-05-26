import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState, useEffect } from "react";

import { GET_COUNTRIES } from "../../../../../apolloClient/queries/allCountryQuery";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";
import moment from "moment";
import useCurrentUserWarehouse from "../../../../../apolloClient/queries/ConsumerDashboard/wearhouse/currentUserWarehouse";
import useAllCategory from "../../../../../apolloClient/queries/category/allCategoryQuery";
import { useTheme } from "@emotion/react";
import useProductUnits from "../../../../../apolloClient/queries/products/productUnits";
import useProductOffers from "../../../../../apolloClient/queries/products/productOffers";
import useProductColors, {
  GET_PRODUCT_COLORS,
} from "../../../../../apolloClient/queries/products/productColors";
import useCreateProduct from "../../../../../apolloClient/mutation/product/createProduct";
import { useForm } from "react-hook-form";
import useCompanies from "../../../../../apolloClient/queries/companies/CompanyQuery";
import useCurrentUserShopName from "../../../../../apolloClient/queries/ConsumerDashboard/shop/currentUserShopName";
import { useRouter } from "next/router";
import client from "../../../../../apolloClient/configuration/apolloConfig";
import useProductsName from "../../../../../apolloClient/queries/products/productsName";
import Repeater from "../../../../../components/Dashboard/Repeater/Repeater";
import useCreateUpdateColor from "../../../../../apolloClient/mutation/product/productColor/createProductColor";
import { useQuery } from "@apollo/client";
import useVatGstList from "../../../../../apolloClient/queries/vatGst/vatGstListQuery";

const CKEditor = dynamic(
  import(
    "../../../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor"
  ),
  {
    ssr: false,
  }
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  //   textAlign: "center",
  marginTop: "10px",
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const tags = [
  "Kids",
  "Men",
  "Women",
  "Old",
  "Young",
  "New",
  "Used",
  "All",
  "Electronic",
];

function getStyles(item, itemTitle, theme) {
  return {
    fontWeight:
      itemTitle.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const addProduct = ({
  token,
  currentUser,
  countries,
  warehouses,
  categories,
  productUnits,
  productOffers,
  // productColors,
  companies,
  shopNames,
  productNames,
  vats,
}) => {
  const [productStatus, setProductStatus] = useState("");
  const [productName, setProductName] = useState("");
  const [ckData, setCkData] = useState("");
  const [gender, setGender] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [warrantyType, setWarrantyType] = useState("");
  const [countryId, setCountryId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [colorId, setColorId] = useState("");
  const [colorName, setColorName] = useState(null);
  const [colorDialogValue, setColorDialogValue] = useState({
    name: "",
  });
  const [open, toggleOpen] = useState(false);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [publishDate, setPublishDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);
  const [sliderImagePreview1, setSliderImagePreview1] = useState(null);
  const [sliderImagePreview2, setSliderImagePreview2] = useState(null);
  const [sliderImagePreview3, setSliderImagePreview3] = useState(null);
  const [sliderImagePreview4, setSliderImagePreview4] = useState(null);
  const [publishStatus, setPublishStatus] = useState(true);
  const [variantStatus, setVariantStatus] = useState(false);
  const [variantId, setVariantId] = useState("");
  const [vatId, setVatId] = useState("");
  const [variantType, setVariantType] = useState("");
  const [variantOptions, setVariantOptions] = useState([]);
  const [productVideoStatus, setProductVideoStatus] = useState(false);
  const [videoCategory, setVideoCategory] = useState("");
  const [madeForKids, setMadeForKids] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnilPreview, setThumbnilPreview] = useState(null);
  const [warehouseId, setWarehouseId] = useState("");
  const [shopId, setShopId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [offerId, setOfferId] = useState("");
  const [tagTitle, setTagTitle] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [sellPrice, setSellPrice] = useState(0.0);
  const [buyPrice, setBuyPrice] = useState(0.0);
  const [comparePrice, setComparePrice] = useState(0.0);
  const [commission, setCommission] = useState(0.0);
  const [featureList, setFeatureList] = useState([{ label: "", value: "" }]);
  const [warrantyList, setWarrantyList] = useState([{ label: "", value: "" }]);

  const router = useRouter();
  const theme = useTheme();
  const filter = createFilterOptions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { productCreateOrUpdate, loading, error } = useCreateProduct();
  const { colorCreateOrUpdate } = useCreateUpdateColor();
  const { data: productColors, loading: productColorsLoading } = useQuery(
    GET_PRODUCT_COLORS,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    setColorId(
      productColors?.colors?.edges.find((v) => v.node.name === colorName)?.node
        ?.id
    );
  }, [productColors]);

  const handleClose = () => {
    setColorDialogValue({
      name: "",
    });
    toggleOpen(false);
  };

  const handleAddColorSubmit = (event) => {
    // event.preventDefault();
    setColorName(colorDialogValue.name);
    colorCreateOrUpdate({
      variables: { name: colorDialogValue.name },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
    });

    handleClose();
  };

  const subCategory = categories?.edges?.find(
    (category) => category?.node?.id === categoryId
  )?.node?.subcategories?.edges;

  const subSubCategory = subCategory?.find(
    (subCategory) => subCategory?.node?.id === subCategoryId
  )?.node?.subsubcategories?.edges;

  const extraFeature = featureList.reduce(
    (obj, item) =>
      Object.assign(obj, item.label ? { [item.label]: item.value } : {}),
    {}
  );
  const extraWarrenty = warrantyList.reduce(
    (obj, item) =>
      Object.assign(obj, item.label ? { [item.label]: item.value } : {}),
    {}
  );

  const arrayOfObj = Object.entries(extraFeature).map((e) => ({
    [e[0]]: e[1],
  }));

  const handleChipChange = (event, setFunction) => {
    const {
      target: { value },
    } = event;
    setFunction(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("productUsedStatus", productStatus);
    formData.append("name", productName);
    formData.append("slug", convertToSlug(productName));
    formData.append("tags", tagTitle.join(" "));
    formData.append("description", ckData);
    formData.append("forGender", gender);
    formData.append("releaseDate", moment(releaseDate).format("YYYY-MM-DD"));
    formData.append("publishedDate", moment(publishDate).format("YYYY-MM-DD"));
    formData.append("warrantyType", warrantyType);
    formData.append("productUnitId", productUnit);
    formData.append("isPublished", publishStatus);
    formData.append("variantOfId", variantId);
    formData.append("colorId", colorId);
    formData.append("vatId", vatId);
    formData.append("companyId", companyId);
    formData.append("originCountryId", countryId);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subCategoryId);
    formData.append("subsubcategoryId", subSubCategoryId);
    formData.append("shopId", shopId);
    formData.append("productofferId", offerId);
    formData.append("size", 10);
    formData.append("length", 100);
    formData.append("isAnalog", true);

    for (let i in data) {
      if (i === "productImage") {
        if (imagePreview !== null) {
          formData.append(i, imagePreview, imagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "productSlider1") {
        if (sliderImagePreview1 !== null) {
          formData.append(i, sliderImagePreview1, sliderImagePreview1.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "productSlider2") {
        if (sliderImagePreview2 !== null) {
          formData.append(i, sliderImagePreview2, sliderImagePreview2.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "productSlider3") {
        if (sliderImagePreview3 !== null) {
          formData.append(i, sliderImagePreview3, sliderImagePreview3.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "productSlider4") {
        if (sliderImagePreview4 !== null) {
          formData.append(i, sliderImagePreview4, sliderImagePreview4.name);
        } else {
          formData.append(i, "");
        }
      }
      // else if (i === "video") {
      //   if (videoPreview !== null) {
      //     formData.append(i, videoPreview, videoPreview.name);
      //   } else {
      //     formData.append(i, "");
      //   }
      // } else if (i === "thumbnil_image") {
      //   if (thumbnilPreview !== null) {
      //     formData.append(i, thumbnilPreview, thumbnilPreview.name);
      //   } else {
      //     formData.append(i, "");
      //   }
      // }
      else {
        formData.append(i, data[i]);
      }
    }
    let dataToUpdate = Object.fromEntries(
      Object.entries(Object.fromEntries(formData)).filter(([_, v]) => v != "")
    );

    // console.log({
    //   ...dataToUpdate,
    //   isPublished: publishStatus,
    //   isAnalog: true,
    //   extraFeature: extraFeature,
    //   extraWarrenty: extraWarrenty,
    // });

    productCreateOrUpdate({
      variables: {
        ...dataToUpdate,
        isPublished: publishStatus,
        isAnalog: true,
        extraFeature: extraFeature,
        extraWarrenty: extraWarrenty,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: () => {
        setOpenAlert(true);
        setTimeout(() => {
          router.push("/consumer-dashboard/inventory/shop/product/allProducts");
        }, 2000);
      },
      onError: (err) => {
        alert(err);
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        TransitionComponent={function TransitionRight(props) {
          return <Slide {...props} direction="left" />;
        }}
        transitionDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product Added successfully!
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Item sx={{ px: { sm: 7 } }}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="productStatus-label">Product Status</InputLabel>
              <Select
                fullWidth
                labelId="productStatus-label"
                id="productStatus"
                value={productStatus}
                label="Product Status"
                onChange={(event) => setProductStatus(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"new"}>New</MenuItem>
                <MenuItem value={"recondition"}>Recondition</MenuItem>
                <MenuItem value={"old"}>Old</MenuItem>
                <MenuItem value={"used"}>used</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              aria-required
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              aria-required
              label="Product Code"
              variant="outlined"
              {...register("code", {
                required: true,
              })}
            />
            <TextField
              sx={{ my: 2 }}
              fullWidth
              disabled
              label="Product Slug"
              variant="outlined"
              aria-readonly
              value={convertToSlug(productName)}
            />
            <Typography>Product Description</Typography>
            <CKEditor ckData={ckData} setCkData={setCkData} />
          </Item>
          <Item>
            <Typography>Specification</Typography>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Brand Name"
                  variant="outlined"
                  {...register("brandName", {
                    // required: true,
                  })}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    fullWidth
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    label="Gender"
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="customerType-label">Customer Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="customerType-label"
                    id="customerType"
                    value={customerType}
                    label="Customer Type"
                    onChange={(event) => setCustomerType(event.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"kids"}>Kids</MenuItem>
                    <MenuItem value={"young"}>Young</MenuItem>
                    <MenuItem value={"old"}>old</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Material"
                  variant="outlined"
                  {...register("material", {
                    // required: true,
                  })}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                  label="Weight"
                  variant="outlined"
                  type="number"
                  defaultValue={0}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                  {...register("weight", {
                    // required: true,
                  })}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Package"
                  variant="outlined"
                  {...register("packageSize", {
                    // required: true,
                  })}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="warrantyType-label">Warranty Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="warrantyType-label"
                    id="warrantyType"
                    value={warrantyType}
                    label="Warranty Type"
                    onChange={(event) => setWarrantyType(event.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"day"}>Day</MenuItem>
                    <MenuItem value={"week"}>Week</MenuItem>
                    <MenuItem value={"month"}>Month</MenuItem>
                    <MenuItem value={"year"}>Year</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Warranty Duration"
                  variant="outlined"
                  type="number"
                  required
                  defaultValue={0}
                  inputProps={{
                    maxLength: 13,
                    min: 0,
                  }}
                  {...register("warranty", {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  sx={{ mt: 2 }}
                  id="size-small-outlined"
                  options={countries?.edges}
                  getOptionLabel={(option) =>
                    option ? option?.node?.name : ""
                  }
                  defaultValue={countries?.edges[18]}
                  name="country"
                  onChange={(event, value) => setCountryId(value?.node?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Origin Country"
                      placeholder="Select country"
                    />
                  )}
                />
                <Autocomplete
                  sx={{ mt: 2 }}
                  id="size-small-outlined"
                  options={companies?.edges}
                  getOptionLabel={(option) =>
                    option ? option?.node?.name : ""
                  }
                  name="companies"
                  onChange={(event, value) => setCompanyId(value?.node?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Company"
                      placeholder="Select Company"
                    />
                  )}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Age Range"
                  variant="outlined"
                  {...register("ageRange", {
                    // required: true,
                  })}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Feature"
                  variant="outlined"
                  {...register("newFeature", {
                    // required: true,
                  })}
                />
                {/* ================================================== */}
                {!productColorsLoading && (
                  <Autocomplete
                    sx={{ mt: 2 }}
                    defaultValue={productColors?.colors?.edges.find(
                      (v) => v.node.name === colorName
                    )}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                          toggleOpen(true);
                          setColorDialogValue({
                            ...colorDialogValue,
                            name: newValue,
                          });
                        });
                      } else if (newValue && newValue?.node?.inputValue) {
                        toggleOpen(true);
                        setColorDialogValue({
                          ...colorDialogValue,
                          name: newValue?.node?.inputValue,
                        });
                      } else {
                        setColorName(newValue?.node?.inputValue);
                        setColorDialogValue({
                          ...colorDialogValue,
                          name: newValue?.node?.inputValue,
                        });
                      }
                      setColorId(newValue?.node?.id);
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      if (params.inputValue !== "") {
                        filtered.push({
                          node: {
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                          },
                        });
                      }
                      return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={productColors?.colors?.edges}
                    getOptionLabel={(option) => {
                      // e.g value selected with enter, right from the input
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option?.node?.inputValue) {
                        return option.node.inputValue;
                      }
                      return option?.node?.name;
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>{option?.node?.name}</li>
                    )}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Color"
                        placeholder="Select Color"
                      />
                    )}
                  />
                )}
                <Dialog open={open} onClose={handleClose}>
                  {/* <form onSubmit={handleAddColorSubmit}> */}
                  <DialogTitle>Add New Color</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Did you miss any Color in our list? Please, add it!
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={colorDialogValue.name}
                      onChange={(event) =>
                        setColorDialogValue({
                          ...colorDialogValue,
                          name: event.target.value,
                        })
                      }
                      label="name"
                      type="text"
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddColorSubmit}>Add</Button>
                  </DialogActions>
                  {/* </form> */}
                </Dialog>
                {/* ================================================== */}

                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Style"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Product Type"
                  variant="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label="Release Date"
                    inputFormat="DD/MM/yyyy"
                    value={releaseDate}
                    onChange={(newValue) => setReleaseDate(newValue)}
                    renderInput={(params) => (
                      <TextField sx={{ mt: 2 }} fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Item>
          <Item>
            <Typography sx={{ mb: 2 }}>Product Image</Typography>
            <Box
              sx={{
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
            </Box>
            <label htmlFor="contained-button-file">
              <Input
                required
                name="productImage"
                {...register("productImage", {
                  required: true,
                })}
                accept="image/*"
                onChange={(event) => setImagePreview(event.target.files[0])}
                id="contained-button-file"
                // multiple
                type="file"
              />
            </label>
          </Item>
          <Item>
            <Typography sx={{ mb: 2 }}>Product Slider Image</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: "120px",
                    marginBottom: "10px",
                  }}
                >
                  {sliderImagePreview1 ? (
                    <img
                      src={URL.createObjectURL(sliderImagePreview1)}
                      width="120"
                      height="140"
                    />
                  ) : (
                    <img
                      src={"/images/selectImage.jpg"}
                      width="120"
                      height="140"
                    />
                  )}
                </Box>
                <label htmlFor="contained-button-file">
                  <Input
                    name="productSlider1"
                    {...register("productSlider1")}
                    accept="image/*"
                    onChange={(event) =>
                      setSliderImagePreview1(event.target.files[0])
                    }
                    id="contained-button-file"
                    // multiple
                    type="file"
                  />
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: "120px",
                    marginBottom: "10px",
                  }}
                >
                  {sliderImagePreview2 ? (
                    <img
                      src={URL.createObjectURL(sliderImagePreview2)}
                      width="120"
                      height="140"
                    />
                  ) : (
                    <img
                      src={"/images/selectImage.jpg"}
                      width="120"
                      height="140"
                    />
                  )}
                </Box>
                <label htmlFor="contained-button-file">
                  <Input
                    name="productSlider2"
                    {...register("productSlider2")}
                    accept="image/*"
                    onChange={(event) =>
                      setSliderImagePreview2(event.target.files[0])
                    }
                    id="contained-button-file"
                    // multiple
                    type="file"
                  />
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: "120px",
                    marginBottom: "10px",
                  }}
                >
                  {sliderImagePreview3 ? (
                    <img
                      src={URL.createObjectURL(sliderImagePreview3)}
                      width="120"
                      height="140"
                    />
                  ) : (
                    <img
                      src={"/images/selectImage.jpg"}
                      width="120"
                      height="140"
                    />
                  )}
                </Box>
                <label htmlFor="contained-button-file">
                  <Input
                    name="productSlider3"
                    {...register("productSlider3")}
                    accept="image/*"
                    onChange={(event) =>
                      setSliderImagePreview3(event.target.files[0])
                    }
                    id="contained-button-file"
                    // multiple
                    type="file"
                  />
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: "120px",
                    marginBottom: "10px",
                  }}
                >
                  {sliderImagePreview4 ? (
                    <img
                      src={URL.createObjectURL(sliderImagePreview4)}
                      width="120"
                      height="140"
                    />
                  ) : (
                    <img
                      src={"/images/selectImage.jpg"}
                      width="120"
                      height="140"
                    />
                  )}
                </Box>
                <label htmlFor="contained-button-file">
                  <Input
                    name="productSlider4"
                    {...register("productSlider4")}
                    accept="image/*"
                    onChange={(event) =>
                      setSliderImagePreview4(event.target.files[0])
                    }
                    id="contained-button-file"
                    // multiple
                    type="file"
                  />
                </label>
              </Grid>
            </Grid>
          </Item>
          <Item>
            <Typography>Price</Typography>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Sell Price"
                  variant="outlined"
                  type={"number"}
                  {...register("sellPrice", {
                    required: true,
                  })}
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Buy Price"
                  variant="outlined"
                  type={"number"}
                  {...register("buyPrice", {
                    required: true,
                  })}
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Product Unit Value"
                  variant="outlined"
                  type={"number"}
                  {...register("productUnitValue", {
                    required: true,
                  })}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Commission"
                  variant="outlined"
                  type={"number"}
                  {...register("commission", {
                    required: true,
                  })}
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Compare at Price"
                  variant="outlined"
                  type={"number"}
                  {...register("comparePrice", {
                    required: true,
                  })}
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Discount"
                  variant="outlined"
                  defaultValue={0.0}
                  type={"number"}
                  {...register("discount", {
                    required: true,
                  })}
                  inputProps={{
                    maxLength: 13,
                    step: ".1",
                    min: 0,
                  }}
                />

                <FormControl
                  fullWidth
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Box>
                    <FormLabel>Margin</FormLabel>
                    <Typography>
                      {(((sellPrice - buyPrice) * 100) / sellPrice).toFixed(
                        2
                      ) || 0.0}
                      %
                    </Typography>
                  </Box>
                  <Box>
                    <FormLabel>Profit</FormLabel>
                    <Typography>{sellPrice - buyPrice}</Typography>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          </Item>
          <Item>
            <Typography>Inventory</Typography>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              defaultValue={0}
              label="Available quantity"
              variant="outlined"
              type={"number"}
              inputProps={{
                maxLength: 13,
                // step: ".1",
                min: 0,
              }}
              {...register("quantity", {
                required: true,
              })}
            />
            <FormGroup sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Track quantity"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Continue selling when out of stock"
              />
            </FormGroup>
          </Item>
          <Item>
            <Typography>Publish Status</Typography>
            <RadioGroup
              row
              value={publishStatus}
              onChange={(event) =>
                setPublishStatus(event.target.value === "true" ? true : false)
              }
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Publish Now"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label=" Publish Later"
              />
            </RadioGroup>
            {!publishStatus && (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Publish Date"
                  inputFormat="DD/MM/yyyy"
                  value={publishDate}
                  onChange={(newValue) => setPublishDate(newValue)}
                  renderInput={(params) => (
                    <TextField sx={{ mt: 2 }} fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            )}
          </Item>

          <Item>
            <Typography>Variant</Typography>
            {/* <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setVariantStatus(event.target.checked)}
                />
              }
              label="This product has multiple variants"
            /> */}

            {/* {variantStatus && ( */}
            <Autocomplete
              sx={{ mt: 2 }}
              id="size-small-outlined"
              options={productNames?.edges}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              //defaultValue={countryData?.continent?.countries?.edges[0]}
              name="variant"
              onChange={(event, value) => setVariantId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Variant"
                  placeholder="Select Variant"
                />
              )}
            />
            {/* )} */}
          </Item>
          <Item>
            <Typography>Extra Feature</Typography>
            <Repeater inputList={featureList} setInputList={setFeatureList} />
          </Item>
          <Item>
            <Typography>Extra Warranty</Typography>
            <Repeater inputList={warrantyList} setInputList={setWarrantyList} />
          </Item>

          {/* <Item>
            <Typography>Variant</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setVariantStatus(event.target.checked)}
                />
              }
              label="This product has multiple options, like different sizes or colors"
            />

            {variantStatus && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="variantType-label">Options</InputLabel>
                      <Select
                        fullWidth
                        labelId="variantType-label"
                        id="variantType"
                        value={variantType}
                        label="Options"
                        onChange={(event) => setVariantType(event.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"color"}>Color</MenuItem>
                        <MenuItem value={"size"}>Size</MenuItem>
                        <MenuItem value={"material"}>Material</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      disabled={variantType ? false : true}
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Use comma to separate each option"
                      variant="outlined"
                      value={variantOptions}
                      onChange={(event) =>
                        setVariantOptions(
                          event.target.value.replace(" ", "").split(",")
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  sx={{ mt: 2, textTransform: "none" }}
                >
                  Add Another Option
                </Button>
              </Box>
            )}
          </Item>
          {variantOptions.length > 0 && variantStatus && (
            <Item>
              <Typography>Preview</Typography>

              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Variant</TableCell>
                    <TableCell align="center">Buy Price</TableCell>
                    <TableCell align="center">Sale Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variantOptions.map(
                    (option, index) =>
                      option && (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                              alignItems: "center",
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {variantType + "_" + option}
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              size="small"
                              label="Buy Price"
                              variant="outlined"
                              type={"number"}
                              inputProps={{
                                maxLength: 13,
                                step: ".5",
                                min: 0,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              size="small"
                              label="Sell Price"
                              variant="outlined"
                              type={"number"}
                              {...register("sellPrice", {
                                required: true,
                              })}
                              inputProps={{
                                maxLength: 13,
                                step: ".5",
                                min: 0,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              fullWidth
                              size="small"
                              label="Quantity"
                              variant="outlined"
                              type={"number"}
                            />
                          </TableCell>
                          <TableCell align="center">Delete</TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </Item>
          )} */}

          {/* ==================================================================== */}

          {/* <Item>
            <Typography>Product Video</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) =>
                    setProductVideoStatus(event.target.checked)
                  }
                />
              }
              label="Check if this product has a Video and want to add that video."
            />
            {productVideoStatus && (
              <Box>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Tags"
                  variant="outlined"
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="videoCategory-label">Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="videoCategory-label"
                    id="videoCategory"
                    value={videoCategory}
                    label="Category"
                    onChange={(event) => setVideoCategory(event.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"people_blog"}>People and Blog</MenuItem>
                    <MenuItem value={"product"}>Product</MenuItem>
                  </Select>
                </FormControl>
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(event) =>
                          setMadeForKids(event.target.checked)
                        }
                      />
                    }
                    label="Made for kids?"
                  />
                </FormGroup>
                <FormControl fullWidth>
                  <FormLabel sx={{ mt: 2 }}>Video File</FormLabel>
                  <Input
                    name="video"
                    accept="video/*"
                    onChange={(event) => setVideoPreview(event.target.files[0])}
                    // multiple
                    type="file"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel sx={{ mt: 2 }}>Thumbnail Image</FormLabel>
                  <Input
                    name="thumbnil_image"
                    accept="image/*"
                    onChange={(event) =>
                      setThumbnilPreview(event.target.files[0])
                    }
                    // multiple
                    type="file"
                  />
                </FormControl>
              </Box>
            )}
          </Item> */}
        </Grid>
        <Grid item md={4} xs={12}>
          <Item>
            <Typography>Warehouse/Shop</Typography>
            <Autocomplete
              sx={{ mt: 2 }}
              id="size-small-outlined"
              options={warehouses?.edges}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              //defaultValue={countryData?.continent?.countries?.edges[0]}
              name="warehouse"
              onChange={(event, value) => setWarehouseId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Warehouse"
                  placeholder="Select Warehouse"
                />
              )}
            />
            <Autocomplete
              sx={{ my: 2 }}
              id="size-small-outlined"
              options={shopNames?.edges}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              name="shop"
              onChange={(event, value) => setShopId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Select Shop"
                  placeholder="Select Shop"
                />
              )}
            />
          </Item>
          <Item>
            <Typography>Category</Typography>
            <Autocomplete
              sx={{ my: 2 }}
              id="size-small-outlined"
              options={categories?.edges ? categories?.edges : []}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              //defaultValue={countryData?.continent?.countries?.edges[0]}
              name="category"
              onChange={(event, value) => setCategoryId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  placeholder="Category"
                />
              )}
            />
            <Autocomplete
              sx={{ my: 2 }}
              id="size-small-outlined"
              options={subCategory ? subCategory : []}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              //defaultValue={countryData?.continent?.countries?.edges[0]}
              name="category"
              onChange={(event, value) => setSubCategoryId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Category"
                  placeholder="Sub Category"
                />
              )}
            />
            <Autocomplete
              sx={{ my: 2 }}
              id="size-small-outlined"
              options={subSubCategory ? subSubCategory : []}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              //defaultValue={countryData?.continent?.countries?.edges[0]}
              name="category"
              onChange={(event, value) => setSubSubCategoryId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Sub Category"
                  placeholder="Sub Sub Category"
                />
              )}
            />
          </Item>
          <Item>
            <Typography>Product Unit</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="productUnit-label">Product Unit</InputLabel>
              <Select
                fullWidth
                labelId="productUnit-label"
                id="productUnit"
                value={productUnit}
                label="Product Unit"
                onChange={(event) => setProductUnit(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {productUnits.map((unit) => (
                  <MenuItem key={unit.node.id} value={unit.node.id}>
                    {unit.node.unitName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <Typography>Product Offer</Typography>
            <Autocomplete
              sx={{ my: 2 }}
              id="size-small-outlined"
              options={productOffers?.edges}
              getOptionLabel={(option) => (option ? option?.node?.name : "")}
              name="productOffers"
              onChange={(event, value) => setOfferId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Offer"
                  placeholder="Select Offer"
                />
              )}
            />
          </Item>
          <Item>
            <Typography>Product Tags</Typography>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="demo-multiple-chip-label">Select Tags</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={tagTitle}
                onChange={(event) => handleChipChange(event, setTagTitle)}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Select Tags"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tags.map((tag) => (
                  <MenuItem
                    key={tag}
                    value={tag}
                    style={getStyles(tag, tagTitle, theme)}
                  >
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <Typography>Select Vat</Typography>
            <Autocomplete
              sx={{ mt: 2 }}
              id="size-small-outlined"
              options={vats?.edges}
              getOptionLabel={(option) =>
                option
                  ? `${option?.node?.country?.name}-${option?.node?.sector}: ${option?.node?.percentageAmt}%`
                  : ""
              }
              name="vat"
              onChange={(event, value) => setVatId(value?.node?.id)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Select Vat"
                  placeholder="Select Vat"
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>
            <Typography>Form Action</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="warning"
                sx={{ textTransform: "none" }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Save
              </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withConsumerAuth(addProduct);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const { data } = await client.query({ query: GET_COUNTRIES });
  const { warehouse } = await useCurrentUserWarehouse(getSessionCookie);
  const { data: category } = await useAllCategory();
  const productUnits = await useProductUnits();
  const productOffers = await useProductOffers(getSessionCookie);
  const productColors = await useProductColors();
  const companies = await useCompanies();
  const shopName = await useCurrentUserShopName(getSessionCookie);
  const productNames = await useProductsName();
  const vats = await useVatGstList();
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
      countries: data.countries,
      warehouses: warehouse.me.consumers.warehouses,
      categories: category.categories,
      productUnits: productUnits.data.productUnits.edges,
      productOffers: productOffers.data?.me?.consumers?.productoffers,
      productColors: productColors.data.colors,
      companies: companies.data.companies,
      shopNames: shopName?.data?.me?.consumers?.shops,
      productNames: productNames.data.products,
      vats: vats.data.vats,
    },
  };
};

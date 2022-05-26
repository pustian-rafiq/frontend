import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import withConsumerAuth from "../../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../../utils/getCookie";
import getCurrentUser from "../../../../../../utils/getCurrentUser";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useAddProductVideo from "../../../../../../apolloClient/mutation/product/productVideo/addProductVideo";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(item, itemTitle, theme) {
  return {
    fontWeight:
      itemTitle.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const addProductVideo = ({ token }) => {
  const [productVideoStatus, setProductVideoStatus] = useState(false);
  const [tagTitle, setTagTitle] = useState([]);
  const [videoCategory, setVideoCategory] = useState(null);
  const [madeForKids, setMadeForKids] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnilPreview, setThumbnilPreview] = useState(null);

  const router = useRouter();
  const { productId } = router.query;

  const { uploadVideo, data, loading, error } = useAddProductVideo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  const handleChipChange = (event, setFunction) => {
    const {
      target: { value },
    } = event;
    setFunction(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("tags", tagTitle.join(" "));
    // formData.append("categoryId", videoCategory);
    formData.append("productId", productId);

    for (let i in data) {
      if (i === "videoFile") {
        if (videoPreview !== null) {
          formData.append(i, videoPreview, videoPreview.name);
        } else {
          formData.append(i, "");
        }
      } else if (i === "thumbnail") {
        if (thumbnilPreview !== null) {
          formData.append(i, thumbnilPreview, thumbnilPreview.name);
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

    console.log(dataToUpdate);

    uploadVideo({
      variables: {
        ...dataToUpdate,
        madeForKids,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: () => {
        // setOpenAlert(true);
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
    <Box sx={{ mx: { sm: 5, md: 10, xs: 2 } }}>
      <Paper sx={{ px: { sm: 5, md: 10, xs: 2 }, py: { sm: 5, md: 6, xs: 2 } }}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "4vw",
          }}
        >
          Product Video
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitHandler)}>
          <TextField
            required
            size="small"
            sx={{ mt: 2 }}
            fullWidth
            label="Title"
            variant="outlined"
            {...register("title")}
          />
          <TextField
            required
            size="small"
            sx={{ mt: 2 }}
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            {...register("description")}
          />
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-multiple-chip-label">Select Tags</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={tagTitle}
              onChange={(event) => handleChipChange(event, setTagTitle)}
              input={
                <OutlinedInput id="select-multiple-chip" label="Select Tags" />
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
          <FormControl fullWidth sx={{ mt: 2 }} size="small">
            <InputLabel id="videoCategory-label">Category</InputLabel>
            <Select
              // required
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
              <MenuItem value={22}>People and Blog</MenuItem>
              <MenuItem value={21}>Product</MenuItem>
            </Select>
          </FormControl>
          <FormGroup sx={{ mt: 2 }} size="small">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setMadeForKids(event.target.checked)}
                />
              }
              label="Made for kids?"
            />
          </FormGroup>
          <FormControl fullWidth size="small">
            <FormLabel sx={{ mt: 2 }}>Video File</FormLabel>
            <Box
              sx={{
                width: "120px",
                marginBottom: "10px",
              }}
            >
              {videoPreview ? (
                <video width="240" height="120" controls>
                  <source
                    src={URL.createObjectURL(videoPreview)}
                    type={videoPreview?.type}
                    // type="video/mp4"
                  />
                </video>
              ) : (
                <img src={"/images/selectImage.jpg"} width="120" height="140" />
              )}
            </Box>
            <Input
              name="videoFile"
              accept="video/*"
              required
              {...register("videoFile")}
              onChange={(event) => setVideoPreview(event.target.files[0])}
              // multiple
              type="file"
            />
          </FormControl>
          <FormControl fullWidth size="small">
            <FormLabel sx={{ mt: 2 }}>Thumbnail Image</FormLabel>
            <Box
              sx={{
                width: "120px",
                marginBottom: "10px",
              }}
            >
              {thumbnilPreview ? (
                <img
                  src={URL.createObjectURL(thumbnilPreview)}
                  width="120"
                  height="140"
                />
              ) : (
                <img src={"/images/selectImage.jpg"} width="120" height="140" />
              )}
            </Box>
            <Input
              name="thumbnail"
              accept="image/*"
              required
              {...register("thumbnail")}
              onChange={(event) => setThumbnilPreview(event.target.files[0])}
              // multiple
              type="file"
            />
          </FormControl>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default withConsumerAuth(addProductVideo);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
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
    },
  };
};

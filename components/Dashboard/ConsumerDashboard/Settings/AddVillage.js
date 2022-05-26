import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  NativeSelect,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import Add from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GET_VILLAGES } from "../../../../apolloClient/queries/address/ContinentQuery";
import useVillageMutation from "../../../../apolloClient/mutation/Settings/Address/AddVillage";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const addIcon = {
  marginTop: "5px",
  marginLeft: "5px",
  cursor: "pointer",
  background: "#1565C0",
  height: "30px",
  width: "30px",
  color: "#fff",
  borderRadius: "50%",
  fontSize: {
    xs: "10px",
    sm: "14px",
    md: "14px",
    lg: "25px",
  },
};

const AddVillage = ({
  open,
  handleClose,
  wards,
  dialogValue,
  setDialogValue,
  setVillageName,
}) => {
  const { villageMutationHandler, error, loading, data } = useVillageMutation();

  const [wardNo, setWardNo] = useState("");
  // const len = districtData && (districtData?.divisionOrState?.districtOrCities?.edges).length
  // useEffect(() => {
  //     const lastDistrict = districtData && districtData?.divisionOrState?.districtOrCities?.edges[0]?.node?.id
  //     setDistrict(lastDistrict);
  // },[len])
  const wardNoHandler = (event) => {
    setWardNo(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add new division handler
  const villageSubmitHandler = (data) => {
    //console.log("data", data);

    if (loading) {
      return <div>Loading......</div>;
    }

    villageMutationHandler({
      variables: {
        name: data.name,
        wordnoId: wardNo,
      },
      refetchQueries: [GET_VILLAGES],

      onCompleted: () => {
        setVillageName(data.name);
        toast.success("Village added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setWardNo("");
        reset({
          name: "",
        });
        handleClose();
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Village not added!", {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ border: "none" }}
      >
        <Box sx={{ ...style, minWidth: 300 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="parent-modal-title"
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                fontWeight: "bold",
              }}
            >
              Add Village
            </Typography>
            <Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ cursor: "pointer", fontSize: { xs: "18px" } }}
              />
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <form onSubmit={handleSubmit(villageSubmitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Name"
                    name="name"
                    value={dialogValue?.name}
                    {...register("name", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setDialogValue({ ...dialogValue, name: e.target.value })
                    }
                  />
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.name &&
                      errors.name.type === "required" &&
                      "You must have a village name"}
                  </Typography>
                </Grid>

                <Grid item xs={9} md={10}>
                  <FormControl sx={{ minWidth: 430 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select Ward Number
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={wardNo}
                      label="Select Ward No"
                      name="wordnoId"
                      {...register("wordnoId", {
                        required: true,
                      })}
                      onChange={(event) => setWardNo(event.target.value)}
                    >
                      {wards &&
                        wards?.municipality?.wordnos?.edges.map((data) => {
                          return (
                            <MenuItem key={data.node.id} value={data.node.id}>
                              {data.node.number}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.wordnoId &&
                      errors.wordnoId.type === "required" &&
                      "You must be selected a word no"}
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "15px",
                      width: "100%",
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddVillage;

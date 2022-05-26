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
import useDistrictMutation from "../../../../apolloClient/mutation/Settings/Address/AddDistrict";
import { GET_ROAD_OR_STREET } from "../../../../apolloClient/queries/address/ContinentQuery";
import Add from "@mui/icons-material/Add";
import AddDistrict from "./AddDistrict";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddPoliceStation from "./AddPoliceStation";
import useRoadStreetMutation from "../../../../apolloClient/mutation/Settings/Address/AddRoadStreet";
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

const AddRoadStreet = ({
  open,
  handleClose,
  districts,
  policeStations,
  dialogValue,
  setDialogValue,
  setRoadStreetNumber,
}) => {
  const { roadStreetMutationHandler, error, loading, data } =
    useRoadStreetMutation();

  const [district, setDistrict] = useState("");
  const [policeStation, setPoliceStation] = useState("");

  let success = false;
  // const len = districtData && (districtData?.divisionOrState?.districtOrCities?.edges).length
  // useEffect(() => {
  //     const lastDistrict = districtData && districtData?.divisionOrState?.districtOrCities?.edges[0]?.node?.id
  //     setDistrict(lastDistrict);
  // }, [len])

  const districtHandler = (event) => {
    setDistrict(event.target.value);
  };
  const policeStationHandler = (event) => {
    setPoliceStation(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add new division handler
  const roadStreetSubmitHandler = (data) => {
    if (loading) {
      return <div>Loading......</div>;
    }

    roadStreetMutationHandler({
      variables: {
        name: data.road_street,
        districtOrCityId: district,
        policeStationId: policeStation,
      },
      refetchQueries: [GET_ROAD_OR_STREET],

      onCompleted: () => {
        setRoadStreetNumber(data.road_street);
        toast.success("Road or street added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          handleClose();
        }, 3000);
        setDistrict("");
        setPoliceStation("");
        reset({
          road_street: "",
        });
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Road or street not added!", {
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
              Add Road/Street No
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
            <form onSubmit={handleSubmit(roadStreetSubmitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Name"
                    name="road_street"
                    value={dialogValue?.name}
                    {...register("road_street", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setDialogValue({ ...dialogValue, name: e.target.value })
                    }
                  />
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.sub_district &&
                      errors.sub_district.type === "required" &&
                      "You must have a road or street name"}
                  </Typography>
                </Grid>
                {/* Police Station Add Field */}
                <Grid item xs={9} md={10}>
                  <FormControl sx={{ minWidth: 430 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select Police Station
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={policeStation}
                      label="Select Police Station"
                      name="police_station"
                      {...register("police_station", {
                        required: true,
                      })}
                      onChange={policeStationHandler}
                    >
                      {policeStations?.districtOrCity?.policeStations?.edges.map(
                        (data, index) => {
                          return (
                            <MenuItem key={index} value={data.node.id}>
                              {data.node.name}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.police_station &&
                      errors.police_station.type === "required" &&
                      "You must be selected police station name"}
                  </Typography>
                </Grid>
                {/* <Grid item xs={2} md={2}>
                                    <Tooltip title="Add Police Station">
                                        <Add sx={addIcon} onClick={() => setOpenPoliceStationModal(true)} />
                                    </Tooltip>
                                </Grid> */}

                {/* District Add Field */}

                <Grid item xs={9} md={10}>
                  <FormControl sx={{ minWidth: 430 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select District/City
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={district}
                      label="Select District/City"
                      name="district_city"
                      {...register("district_city", {
                        required: true,
                      })}
                      onChange={districtHandler}
                    >
                      {districts &&
                        districts?.divisionOrState?.districtOrCities?.edges.map(
                          (district, index) => {
                            return (
                              <MenuItem key={index} value={district.node.id}>
                                {district.node.name}
                              </MenuItem>
                            );
                          }
                        )}
                    </Select>
                  </FormControl>
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.district_city &&
                      errors.district_city.type === "required" &&
                      "You must be selected a division name"}
                  </Typography>
                </Grid>
                {/* <Grid item xs={2} md={2}>
                                    <Tooltip title="Add District">
                                        <Add sx={addIcon} onClick={() => setOpenDistrictModal(true)} />
                                    </Tooltip>
                                </Grid> */}
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

export default AddRoadStreet;

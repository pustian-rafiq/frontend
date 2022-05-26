import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { GET_POLICE_STATION } from "../../../../apolloClient/queries/address/ContinentQuery";
import usePoliceStationMutation from "../../../../apolloClient/mutation/Settings/Address/AddPoliceStation";
import AddDistrict from "./AddDistrict";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

const AddPoliceStation = ({
  open,
  handleClose,
  districts,
  dialogValue,
  setDialogValue,
  setPolicStationName,
}) => {
  //const [districtId, setDistrictId] = useState("")

  const { policeStationMutationHandler, error, loading, data } =
    usePoliceStationMutation();
  //Handle Police station district field
  const [district, setDistrict] = useState("");
  // const len = districtData && (districtData?.divisionOrState?.districtOrCities?.edges)?.length
  // useEffect(() => {
  //     const lastDistrict = districtData && districtData?.divisionOrState?.districtOrCities?.edges[0]?.node?.id
  //     setDistrict(lastDistrict);
  // },[len])
  const districtHandler = (event) => {
    setDistrict(event.target.value);
    console.log(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add new division handler
  const divisionSubmitHandler = (data) => {
    if (loading) {
      return <div>Loading......</div>;
    }

    policeStationMutationHandler({
      variables: {
        name: data.police_station,
        districtOrCityId: district,
      },
      refetchQueries: [GET_POLICE_STATION],

      onCompleted: () => {
        setPolicStationName(data.police_station);
        toast.success("Police station added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setDistrict("");
        reset({
          police_station: "",
        });
        handleClose();
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Police station not added!", {
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
              Add New Police Station
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
            <form onSubmit={handleSubmit(divisionSubmitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={9} md={10}>
                  <FormControl sx={{ minWidth: 430 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select District
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={district}
                      label="Select District"
                      //name="district"
                      {...register("district", {
                        required: true,
                      })}
                      onChange={districtHandler}
                    >
                      {districts?.divisionOrState?.districtOrCities?.edges.map(
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
                    {errors.district &&
                      errors.district.type === "required" &&
                      "You must be selected a district name"}
                  </Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Police Station"
                    name="police_station"
                    value={dialogValue?.name}
                    {...register("police_station", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setDialogValue({ ...dialogValue, name: e.target.value })
                    }
                  />
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.police_station &&
                      errors.police_station.type === "required" &&
                      "You must have a police station"}
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

export default AddPoliceStation;

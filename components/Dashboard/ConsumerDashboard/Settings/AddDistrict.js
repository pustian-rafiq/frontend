import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import useDistrictMutation from "../../../../apolloClient/mutation/Settings/Address/AddDistrict";
import { GET_DISTRICT_CITY } from "../../../../apolloClient/queries/address/ContinentQuery";
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

const AddDistrict = ({
  open,
  handleClose,
  divisions,
  dialogValue,
  setDialogValue,
  setDistrictName,
}) => {
  const [divisionId, setDivisionId] = useState("");
  const { districtMutationHandler, error, loading, data } =
    useDistrictMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const districtChangeHandler = (event) => {
    setDivisionId(event.target.value);
  };
  // Add new division handler
  const divisionSubmitHandler = (data) => {
    setDistrictName(data.district_city);

    if (loading) {
      return <div>Loading......</div>;
    }
    districtMutationHandler({
      variables: {
        name: data.district_city,
        divisionOrStateId: divisionId,
      },
      refetchQueries: [GET_DISTRICT_CITY],
      onCompleted: () => {
        //isAddedDistrict(true)
        //addedDistrictName(data.district_city)
        toast.success("District added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setDivisionId("");
        reset({
          district_city: "",
        });
        handleClose();
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("District not added!", {
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
              Add New District
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
                      Select Division
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={divisionId}
                      label="Select Division"
                      name="division"
                      {...register("division", {
                        required: true,
                      })}
                      onChange={districtChangeHandler}
                    >
                      {divisions?.country?.divisionOrStates?.edges.map(
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
                    {errors.country &&
                      errors.country.type === "required" &&
                      "You must be selected a division name"}
                  </Typography>
                </Grid>
                {/* <Grid item xs={2} md={2}>
                                    <Tooltip title="Add Division">
                                        <Add sx={addIcon} onClick={()=> setOpenDivisionModal(true)} />
                                    </Tooltip>
                                </Grid> */}
                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="District or City"
                    name="district_city"
                    value={dialogValue?.name}
                    {...register("district_city", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setDialogValue({ ...dialogValue, name: e.target.value })
                    }
                  />
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.division_state &&
                      errors.division_state.type === "required" &&
                      "You must have a district or city name"}
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
      {/* <AddDivision open={openDivisionModal} handleClose={()=> setOpenDivisionModal(false)}  countries={countries} /> */}
    </>
  );
};

export default AddDistrict;

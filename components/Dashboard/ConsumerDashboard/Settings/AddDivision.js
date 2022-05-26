import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import useDivisionMutation from "../../../../apolloClient/mutation/Settings/Address/AddDivision";
import { GET_DIVISION_STATE } from "../../../../apolloClient/queries/address/ContinentQuery";
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

const AddDivision = ({
  open,
  handleClose,
  countries,
  isAddedDivision,
  setDivisionName,
  dialogValue,
  setDialogValue,
}) => {
  const [countryId, setCountryId] = useState("");
  const { divisionMutationHandler, error, loading, data } =
    useDivisionMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const countryChangeHandler = (event) => {
    setCountryId(event.target.value);
  };
  // Add new division handler
  const divisionSubmitHandler = (data) => {
    setDivisionName(data.division_state);
    if (loading) {
      return <div>Loading......</div>;
    }

    divisionMutationHandler({
      variables: {
        name: data.division_state,
        countryId: countryId,
      },

      onCompleted: () => {
        //isAddedDivision(true)
        setCountryId("");
        reset({
          division_state: "",
        });
        toast.success("Division added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        handleClose();
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Division not added!", {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
    console.log("submitted");
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
              Add New Division
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
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Division or State"
                    name="division_state"
                    value={dialogValue?.name}
                    {...register("division_state", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setDialogValue({ ...dialogValue, name: e.target.value })
                    }
                  />
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.division_state &&
                      errors.division_state.type === "required" &&
                      "You must have a division or state name"}
                  </Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <FormControl sx={{ minWidth: 430 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select Country
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={countryId}
                      label="Select Country"
                      name="country"
                      {...register("country", {
                        required: true,
                      })}
                      onChange={countryChangeHandler}
                    >
                      {countries &&
                        countries?.continent?.countries?.edges.map(
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
                      "You must be selected a country name"}
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

export default AddDivision;

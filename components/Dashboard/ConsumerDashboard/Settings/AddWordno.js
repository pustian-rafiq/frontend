import {
  Alert,
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
import { GET_WARD_NO } from "../../../../apolloClient/queries/address/ContinentQuery";
import AddUnion from "./AddUnion";
import AddMunicipality from "./AddMunicipality";
import useWordnoMutation from "../../../../apolloClient/mutation/Settings/Address/AddWordno";
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

const AddWordNo = ({
  open,
  handleClose,
  municipalities,
  dialogValue,
  setDialogValue,
  setWardNumber,
}) => {
  const { wordnoMutationHandler, error, loading, data } = useWordnoMutation();

  const [municipalityId, setMunicipalityId] = useState("");

  const municipalityHandler = (event) => {
    setMunicipalityId(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add new division handler
  const wordnoSubmitHandler = (data) => {
    if (loading) {
      return <div>Loading......</div>;
    }

    wordnoMutationHandler({
      variables: {
        number: data.number,
        municipalityId: municipalityId,
      },
      refetchQueries: [GET_WARD_NO],

      onCompleted: () => {
        setWardNumber(data.number);
        toast.success("Wordno added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setMunicipalityId("");
        reset({
          number: "",
        });
        handleClose();
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Wordno not added!", {
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
              Add Wordno
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
            <form onSubmit={handleSubmit(wordnoSubmitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={9} md={10}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    label="Number"
                    name="number"
                    value={dialogValue?.number}
                    {...register("number", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setDialogValue({ ...dialogValue, number: e.target.value })
                    }
                  />
                  <Typography sx={{ color: "#E75C33" }}>
                    {errors.number &&
                      errors.number.type === "required" &&
                      "You must have a word number"}
                  </Typography>
                </Grid>

                {/* Municipality */}
                <Grid item xs={9} md={10}>
                  <FormControl sx={{ minWidth: 430 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select Municipality
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-large"
                      value={municipalityId}
                      label="Select Municipality"
                      //name="district"
                      {...register("municipality")}
                      onChange={municipalityHandler}
                    >
                      {municipalities &&
                        municipalities?.policeStation?.municipalities?.edges.map(
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
                </Grid>
                {/* <Grid item xs={2} md={2}>
                  <Tooltip title="Add Police Station">
                    <Add
                      sx={addIcon}
                      onClick={() => setOpenPoliceStationModal(true)}
                    />
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
      {/* <AddUnion open={openUnionModal} handleClose={() => setOpenUnionModal(false)} districtData={districtData} />
            <AddMunicipality open={openMunicipalityModal} handleClose={() => setOpenMuniipalityModal(false)} districtData={districtData} /> */}
    </>
  );
};

export default AddWordNo;

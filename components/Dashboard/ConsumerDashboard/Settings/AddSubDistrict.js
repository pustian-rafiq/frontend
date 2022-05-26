import { Alert, Autocomplete, Box, Button, Divider, Grid, IconButton, Modal, NativeSelect, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from 'react-hook-form';
import useDistrictMutation from '../../../../apolloClient/mutation/Settings/Address/AddDistrict';
import { GET_DISTRICT_CITY, GET_SUB_DISTRICT } from '../../../../apolloClient/queries/address/ContinentQuery';
import Add from '@mui/icons-material/Add';
import AddDistrict from './AddDistrict';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSubDistrictMutation from '../../../../apolloClient/mutation/Settings/Address/AddSubDistrict';

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

const AddSubDistrict = ({ open, handleClose, districtData, divisionStates, isAddedSubDistrict }) => {
    // Modal
    const [openDistrictModal, setOpenDistrictModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { subDistrictMutationHandler, error, loading, data } = useSubDistrictMutation()

    const [district, setDistrict] = useState('');
    // const len = districtData && (districtData?.divisionOrState?.districtOrCities?.edges)?.length
    // useEffect(() => {
    //     const lastDistrict = districtData && districtData?.divisionOrState?.districtOrCities?.edges[0]?.node?.id
    //     setDistrict(lastDistrict);
    // },[len])
    const districtHandler = (event) => {
        setDistrict(event.target.value);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Add new division handler
    const subDistrictSubmitHandler = (data) => {

        if (loading) {
            return <div>Loading......</div>;
        }

        subDistrictMutationHandler({
            variables: {
                name: data.sub_district,
                districtOrCityId: district,

            },
            refetchQueries: [GET_SUB_DISTRICT],

            onCompleted: () => {
                //router.push("/consumer-dashboard/shop/shop-list");
                setIsSuccess(true);
                isAddedSubDistrict(true)
                setTimeout(() => {
                    reset({
                        name: "",
                    });
                    setIsSuccess(false);
                    handleClose()
                }, 3000);
            },
            onError: (err) => {
                console.log("please input valid value :: ", err);
                setIsError(true);
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
                            Add Sub District
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
                        <form onSubmit={handleSubmit(subDistrictSubmitHandler)}>
                            <Box
                                sx={{ width: "83%" }}
                                style={isSuccess ? { display: "block" } : { display: "none" }}
                            >
                                <Alert
                                    action={
                                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => {
                                            setIsSuccess(false);
                                        }}>
                                            <CloseIcon
                                                fontSize="inherit"

                                            />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="success"
                                >
                                    Sub District Added Successfully!
                                </Alert>
                            </Box>

                            <Box
                                sx={{ width: "83%" }}
                                style={isError ? { display: "block" } : { display: "none" }}
                            >
                                <Alert
                                    action={
                                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => {
                                            setIsError(false);
                                        }}>
                                            <CloseIcon
                                                fontSize="inherit"

                                            />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="warning"
                                >
                                    Sub District not added!
                                </Alert>
                            </Box>
                            <Grid container spacing={2}>

                                <Grid item xs={9} md={10}>
                                    <FormControl sx={{ minWidth: 430 }} size="small">
                                        <InputLabel id="demo-select-small">Select District</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-large"
                                            value={district}
                                            label="Select District"
                                            //name="district"
                                            {...register("district", {
                                                required: true
                                            })}
                                            onChange={districtHandler}

                                        >
                                            {
                                                districtData && districtData?.divisionOrState?.districtOrCities?.edges.map((district, index) => {
                                                    return <MenuItem key={index} value={district.node.id}>{district.node.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <Typography sx={{ color: "#E75C33" }}>
                                        {errors.country &&
                                            errors.country.type === "required" &&
                                            "You must be selected a district name"}
                                    </Typography>
                                </Grid>
                                {/* <Grid item xs={2} md={2}>
                                    <Tooltip title="Add District">
                                        <Add sx={addIcon} onClick={() => setOpenDistrictModal(true)} />
                                    </Tooltip>
                                </Grid>   */}

                                <Grid item xs={9} md={10}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        id="fullWidth"
                                        label="Name"
                                        name="sub_district"
                                        {...register("sub_district", {
                                            required: true
                                        })}

                                    />
                                    <Typography sx={{ color: "#E75C33" }}>
                                        {errors.sub_district &&
                                            errors.sub_district.type === "required" &&
                                            "You must have a sub-district name"}
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
            {/* <AddDistrict open={openDistrictModal} handleClose={() => setOpenDistrictModal(false)} divisionStates={divisionStates} /> */}
        </>
    )
}

export default AddSubDistrict
import React, { useState, useEffect } from 'react'
import { Autocomplete, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from 'next/router';
import { GET_PROFILE_DETAILS } from '../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails';
import useUpdateBiodata from '../../../../apolloClient/mutation/Settings/UpdateBiodataSection';

const Biodata = ({ ConsumerDetails, token }) => {
    const router = useRouter()
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);

    // Biodata section input filed state and data update management
    const [blood, setBlood] = useState("");
    const [maritalType, setMaritalType] = useState("");

    // Biodata Mutation handler
    const {
        biodataMutationHandler,
        loading: biodataLoading,
        error: biodataError,
    } = useUpdateBiodata();
    
    useEffect(() => {
        setBlood(ConsumerDetails?.me?.consumers?.bloodGroup)
        setMaritalType(ConsumerDetails?.me?.consumers?.maritalStatus)
    }, [ConsumerDetails]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    // Update Biodata form handler
    const biodataSubmitHandler = (data) => {
        biodataMutationHandler({
            variables: {
                id: ConsumerDetails?.me?.consumers?.id,
                bio: data.bio,
                bloodGroup: data.bloodGroup ? data.bloodGroup : blood,
                height: data.height,
                weight: data.weight,
                hobby: data.hobby,
                maritalStatus: data.maritalStatus ? data.maritalStatus : maritalType,
                languages: data.language,
                aboutFamilyMembers: data.family_members,
                aboutTour: data.about_tour,
                designationAndServiceOrganization: data.designation,
            },
            refetchQueries: [{ query: GET_PROFILE_DETAILS }],
            context: {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            },

            onCompleted: () => {
               // console.log("on completed");
                // router.push("/admin-dashboard/inventory/category")
                setOpen(true);
                setTimeout(() => {
                    router.push("/consumer-dashboard/profile")
                    setOpen(false);
                }, 3000);
            },
            onError: (err) => {
                console.log("err", err)
                setTimeout(() => {
                    setIsError(true);
                }, 5000);
            },
        });

        if (!biodataLoading && !biodataError) {
            console.log("DOne")
            //router.push("/admin-dashboard/inventory/category");
        } else {
            //alert(vatUpdateError);
        }
    };
    return (
        <>
            <Box
                sx={{ width: "100%" }}
                style={open ? { display: "block" } : { display: "none" }}
            >
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    variant="filled"
                    severity="success"
                >
                    Biodata updated successfully!
                </Alert>
            </Box>

            <Box
                sx={{ width: "100%" }}
                style={isError ? { display: "block" } : { display: "none" }}
            >
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsError(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    variant="filled"
                    severity="warning"
                >
                    Biodata not updated!
                </Alert>
            </Box>
            <form onSubmit={handleSubmit(biodataSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Bio"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.bio}
                            name="bio"
                            {...register("bio")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={bloodGroup}
                            getOptionLabel={(option) => option.name}
                            // defaultValue={bloodGroup[0]}
                            name="bloodGroup"
                            defaultValue={bloodGroup.find(
                                (v) => v.name === ConsumerDetails?.me?.consumers?.bloodGroup
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...register("bloodGroup")}
                                    {...params}
                                    label="Blood Group"
                                    placeholder="Select Blood Group"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Height"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.height}
                            name="height"
                            {...register("height")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Weight"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.weight}
                            name="weight"
                            {...register("weight")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Hobby"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.hobby}
                            name="hobby"
                            {...register("hobby")}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={maritalStatus}
                            getOptionLabel={(option) => option.status}
                            name="maritalStatus"
                            defaultValue={maritalStatus.find(
                                (v) =>
                                    v.status === ConsumerDetails?.me?.consumers?.maritalStatus
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...register("maritalStatus")}
                                    {...params}
                                    label="Marital Status"
                                    placeholder="Select Marital Status"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Language"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.languages}
                            name="language"
                            {...register("language")}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Family Members"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.aboutFamilyMembers}
                            name="family_members"
                            {...register("family_members")}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="About Tour"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.aboutTour}
                            name="about_tour"
                            {...register("about_tour")}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Designation"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.designationAndServiceOrganization}
                            name="designation"
                            {...register("designation")}
                        />

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
                            Update Biodata
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </>
    )
}

export default Biodata

const bloodGroup = [
    { name: "A+" },
    { name: "A-" },
    { name: "B+" },
    { name: "B-" },
    { name: "O+" },
    { name: "O-" },
    { name: "AB+" },
    { name: "AB-" },
  ];
  
  const maritalStatus = [{ status: "Married" }, { status: "Unmarried" }];
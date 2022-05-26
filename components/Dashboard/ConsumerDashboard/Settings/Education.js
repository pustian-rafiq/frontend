import React, { useState, useEffect } from 'react'
import { Autocomplete, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from 'next/router';
import useUpdateEducation from '../../../../apolloClient/mutation/Settings/UpdateEducationSection';
import { GET_PROFILE_DETAILS } from '../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails';

const Education = ({ ConsumerDetails, token }) => {
    const router = useRouter()
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
    // Education Mutation handler
    const {
        educationMutationHandler,
        loading: educationLoading,
        error: educationError,
    } = useUpdateEducation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    // Update education form handler
    const educationSubmitHandler = (data) => {

        educationMutationHandler({
            variables: {
                id: ConsumerDetails?.me?.consumers?.id,
                primaryNameAndSession: data.primary,
                highschoolNameAndSession: data.highschool,
                collegeNameAndSession: data.college,
                universityNameAndSession: data.university,
                phdNameAndSession: data.phd,
                othersNameAndSession: data.other,
            },
            refetchQueries: [{ query: GET_PROFILE_DETAILS }],
            context: {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            },

            onCompleted: () => {
                console.log("on completed");
                // router.push("/admin-dashboard/inventory/category")
                setOpen(true);
                setTimeout(() => {
                    router.push("/consumer-dashboard/profile")
                    setOpen(false);
                }, 5000);
            },
            onError: (err) => {
                console.log("err", err)
                setTimeout(() => {
                    setIsError(true);
                }, 3000);
            },
        });

        if (!educationLoading && !educationError) {
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
                    Education updated successfully!
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
                    Education not updated!
                </Alert>
            </Box>
            <form onSubmit={handleSubmit(educationSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Primary school name & session"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.primaryNameAndSession}
                            name="primary"
                            {...register("primary")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="High school name & session"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.highschoolNameAndSession}
                            name="highschool"
                            {...register("highschool")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="College name & session"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.collegeNameAndSession}
                            name="college"
                            {...register("college")}
                        />
                    </Grid>


                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="University name & session"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.universityNameAndSession}
                            name="university"
                            {...register("university")}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="PHD"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.phdNameAndSession}
                            name="phd"
                            {...register("phd")}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Others name & session"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.othersNameAndSession}
                            name="other"
                            {...register("other")}
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
                            Update Education
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </>
    )
}

export default Education
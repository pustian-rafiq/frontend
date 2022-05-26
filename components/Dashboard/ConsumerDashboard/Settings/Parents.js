
import React, { useState, useEffect } from 'react'

import {  Button, Divider, Grid, Stack, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from 'next/router';
import useUpdateParents from '../../../../apolloClient/mutation/Settings/UpdateParentSection';
import { GET_PROFILE_DETAILS } from '../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails';


  
const Parents = ({ ConsumerDetails, token }) => {
    const router = useRouter()
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
      // Parents Mutation handler
  const {
    parentsMutationHandler,
    loading: parentsLoading,
    error: parentsError,
  } = useUpdateParents();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      
    // if (consumerLoading) {
    //     return <div>Loading.....</div>
    //   }  

      
    // Update education form handler
    const parentsSubmitHandler = (data) => {

        parentsMutationHandler({
            variables: {
                id: ConsumerDetails?.me?.consumers?.id,
                fatherName: data.fatherName,
                fatherOccupation: data.fatherOccupation,
                motherName: data.motherName,
                motherOccupation: data.motherOccupation,
            },
            refetchQueries: [{ query: GET_PROFILE_DETAILS }],
            context: {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            },

            onCompleted: () => {
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

        if (!parentsLoading && !parentsError) {
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
                    Parents updated successfully!
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
                    Parents not updated!
                </Alert>
            </Box>
            <form onSubmit={handleSubmit(parentsSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Father Name"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.fatherName}
                            name="fatherName"
                            {...register("fatherName")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Father Occupation"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.fatherOccupation}
                            name="fatherOccupation"
                            {...register("fatherOccupation")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Mother Name"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.motherName}
                            name="motherName"
                            {...register("motherName")}
                        />
                    </Grid>


                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Mother Occupation"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.motherOccupation}
                            name="motherOccupation"
                            {...register("motherOccupation")}
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
                            Update Parents
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </>
    )
}

export default Parents
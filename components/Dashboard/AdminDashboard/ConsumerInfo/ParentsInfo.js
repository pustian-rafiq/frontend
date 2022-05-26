import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from 'react-hook-form';
import { Stack } from "@mui/material";
import useUpdatePersonalInfo from "../../../../apolloClient/mutation/consumerinfo/UpdatePersonalInfoSection";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GET_MASTER_CONSUMERS } from "../../../../apolloClient/queries/consumer/allMasterUserQuery";
import useUpdateParentsInfo from "../../../../apolloClient/mutation/consumerinfo/UpdateParentsInfo";
const Input = styled("input")({
    display: "none",
});
const ParentsInfo = ({ consumerData, countries, token }) => {
    const router = useRouter()
    console.log("consumerData", consumerData)

    // Image Preview code
    const [imagePreview, setImagePreview] = useState({ file: null });
    const handleImageChange = (event) => {
        console.log(event.target.files[0]);
        setImagePreview({
            file: URL.createObjectURL(event.target.files[0]),
        });
    };

    //About mutation handler
    const {
        parentsInfoMutationHandler,
        loading: parentsInfoLoading,
        error: parentsInfoError,
    } = useUpdateParentsInfo();

    const { register, handleSubmit, reset } = useForm();

    // Personal information update handler

    const updateParentslInformation = (data) => {
        console.log("data", data);

        parentsInfoMutationHandler({
            variables: {
                id: consumerData?.consumer?.id,
                fatherName: data.fatherName,
                motherName: data.motherName,
                fatherOccupation: data.fatherOccupation,
                motherOccupation: data.motherOccupation,
            },
            refetchQueries: [{ query: GET_MASTER_CONSUMERS }],
            context: {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            },

            onCompleted: () => {
                toast.success('Master user updated successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                });
                reset({})
                setTimeout(() => {
                    router.push("/admin-dashboard/consumer-info/master-list")
                }, 3000);
            },
            onError: (err) => {
                console.log("err", err)
                toast.warn('Master user not updated!', {
                    position: "top-center",
                    autoClose: 3000,
                });
            },
        });

        if (!parentsInfoLoading && !parentsInfoError) {
            //router.push("/admin-dashboard/inventory/category");
        } else {
            //alert(vatUpdateError);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(updateParentslInformation)}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Father name"
                            defaultValue={consumerData?.consumer?.fatherName}
                            {...register("fatherName")}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Father occupation"
                            defaultValue={
                                consumerData?.consumer?.fatherOccupation
                            }
                            {...register("fatherOccupation")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Mother Name"
                            defaultValue={consumerData?.consumer?.motherName}
                            {...register("motherName")}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Mother occupation"
                            defaultValue={
                                consumerData?.consumer?.motherOccupation
                            }
                            {...register("motherOccupation")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '100%', fontSize: { xs: '12px', sm: '14px', md: '16px' }, background: '#45B9E0', ":hover": { background: '#3a9cbc' }, color: '#fff', textTransform: 'capitalize' }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default ParentsInfo


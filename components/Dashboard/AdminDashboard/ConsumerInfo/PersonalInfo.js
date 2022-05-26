import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from 'react-hook-form';
import { Stack } from "@mui/material";
import useUpdatePersonalInfo from "../../../../apolloClient/mutation/consumerinfo/UpdatePersonalInfoSection";
import { GET_MASTER_CONSUMER_DETAILS } from "../../../../apolloClient/queries/consumer/EditMasterConsumer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GET_MASTER_CONSUMERS } from "../../../../apolloClient/queries/consumer/allMasterUserQuery";
const Input = styled("input")({
    display: "none",
});
const PersonalInfo = ({ consumerData, countries,token }) => {
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
        personalInfoMutationHandler,
        loading: personalInfoLoading,
        error: personalInfoError,
    } = useUpdatePersonalInfo();

    const { register, handleSubmit, reset } = useForm();

    // Personal information update handler

    const updatePersonalInformation = (data) => {
        console.log("data", data);

        personalInfoMutationHandler({
            variables: {
                id: consumerData?.consumer?.id,
                firstName: data.firstName,
                lastName: data.lastName,
            },
            refetchQueries: [{ query: GET_MASTER_CONSUMERS }],
            context: {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            },

            onCompleted: () => {
                // console.log("on completed");
                // router.push("/admin-dashboard/inventory/category")
                //setOpen(true);
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

        if (!personalInfoLoading && !personalInfoError) {
            //router.push("/admin-dashboard/inventory/category");
        } else {
            //alert(vatUpdateError);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(updatePersonalInformation)}>
                <Grid container spacing={1}>
                    {/* First name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="First name *"
                            defaultValue={consumerData?.consumer?.user?.firstName}
                            {...register("firstName")}
                        />
                    </Grid>
                    {/* Last Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Last name*"
                            defaultValue={consumerData?.consumer?.user?.lastName}
                            {...register("lastName")}
                        />
                    </Grid>
                    {/* Country */}
                    <Grid item xs={12} md={6} >
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={countries?.edges}
                            getOptionLabel={(option) =>
                                option ? option?.node?.name : ""
                            }
                            // defaultValue={countries.edges[18]}
                            defaultValue={countries?.edges.find(
                                (v) =>
                                    v.node.name ===
                                    consumerData?.consumer?.country?.name
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Country *"
                                    placeholder="Select Country *"
                                />
                            )}
                        />
                    </Grid>

                    {/* CallingCode and phone No */}
                    <Grid item xs={12} md={6} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="fullWidth"
                                    label="Calling Code *"
                                    name="calling_code"
                                    defaultValue={consumerData?.consumer?.callingCode}
                                    {...register("calling_code")}
                                    inputProps={
                                        { readOnly: true }
                                    }
                                    sx={{ background: '#f7f7f7' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="fullWidth"
                                    label="Phone *"
                                    name="phone"
                                    defaultValue={consumerData?.consumer?.phone}
                                    {...register("phone", {
                                        required: true,
                                    })}
                                />
                                {/* <Typography sx={{ color: "#E75C33" }}>
                              {errors.phone &&
                                errors.phone.type === "required" &&
                                "You must have phone no"}
                            </Typography> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* religion */}
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={religionList}
                            getOptionLabel={(option) => option.name}
                            //defaultValue={religionList[0]}
                            defaultValue={religionList.find(
                                (v) => v.name === consumerData?.consumer?.religion
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Religion"
                                    placeholder="Religion"
                                />
                            )}
                        />
                    </Grid>

                    {/* Gender List */}
                    <Grid item xs={12} md={6} >
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={genderList}
                            getOptionLabel={(option) => option.type}
                            //  defaultValue={genderList[0]}
                            defaultValue={genderList.find(
                                (v) => v.type === consumerData?.consumer?.gender
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Gender *"
                                    placeholder="Gender *"
                                />
                            )}
                        />
                    </Grid>
                    {/*Date of birth*/}
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            size="small"
                            inputProps={{ readOnly: true }}
                            label="Date of birth"
                            id="fullWidth"
                            defaultValue={consumerData?.consumer?.dateOfBirth}
                            {...register("dateOfBirth")}
                        />
                    </Grid>

                    {/* Occupation */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Occupation"
                            defaultValue={consumerData?.consumer?.occupation}
                            {...register("occupation")}
                        />
                    </Grid>
                    {/* Nid number */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Nid number"
                            defaultValue={consumerData?.consumer?.nidNumber}
                            {...register("nidNumber")}
                        />
                    </Grid>

                    {/* Spouse Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            size="small"
                            inputProps={{ readOnly: true }}
                            id="fullWidth"
                            label="Spouse Name"
                            defaultValue={consumerData?.consumer?.spouseName}
                            {...register("spouseName")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Box
                            style={{
                                border: "1px solid #000",
                                height: "162px",
                                width: "162px",
                                marginBottom: "10px",
                            }}
                        >
                            {imagePreview.file ? (
                                <img
                                    src={imagePreview.file}
                                    width="160"
                                    height="160"
                                />
                            ) : (
                                <img
                                    src="/images/profile-picture.jpg"
                                    width="160"
                                    height="160"
                                />
                            )}
                        </Box>
                        <Stack>
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <Button
                                    component="span"
                                    sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' }, background: '#45B9E0', ":hover": { background: '#3a9cbc' }, color: '#fff', textTransform: 'capitalize' }}
                                >
                                    Upload Profile Photo
                                </Button>
                            </label>
                        </Stack>
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

export default PersonalInfo

const religionList = [
    { name: "Islam" },
    { name: "Hinduism" },
    { name: "Christianity" },
    { name: "Buddhism" },
    { name: "Jainism" },
    { name: "Others" },
];
const genderList = [{ type: "Male" }, { type: "Female" }, { type: "Others" }];

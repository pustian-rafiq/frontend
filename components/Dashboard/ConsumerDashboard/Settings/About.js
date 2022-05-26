import React, { useState, useEffect } from 'react'
import { Autocomplete, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

import { GET_PROFILE_DETAILS } from '../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails';
import useUpdateAbout from '../../../../apolloClient/mutation/Settings/UpdateAboutSection';
import { useRouter } from 'next/router';



const About = ({ConsumerDetails, countries,token }) => {
    const router = useRouter()
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
    const [dateValue, setDateValue] = useState();
    // Fetch consumer details information
    // const { data: countries, loading: countryLoading } = useQuery(GET_COUNTRIES)
    // Fetch consumer details information
    // const { data: ConsumerDetails, loading: consumerLoading } = useQuery(GET_PROFILE_DETAILS, {
    //     context: {
    //         headers: {
    //             Authorization: `JWT ${token}`,
    //         },
    //     },
    // })

   // console.log("countries",countries)
    // About section input filed state and data update management
   
    const [callingCode, setCallingCode] = useState("");
    const [country, setCountry] = useState("");
    const [countryId, setCountryId] = useState("");
    const [gender, setGender] = useState("");
    const [religion, setReligion] = useState("");


    //About mutation handler
    const {
        aboutMutationHandler,
        loading: aboutLoading,
        error: aboutError,
    } = useUpdateAbout();


    useEffect(() => {
        setCallingCode(ConsumerDetails?.me?.consumers?.callingCode);
        setCountry(ConsumerDetails?.me?.consumers?.consumeraddresses?.country?.id);
        setGender(ConsumerDetails?.me?.consumers?.gender);
        setReligion(ConsumerDetails?.me?.consumers?.religion);
    }, [ConsumerDetails]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    // if (consumerLoading) {
    //     return <div>Loading.....</div>
    // }
    //console.log("ConsumerDetails", ConsumerDetails)



    // Update about form handler
    const aboutSubmitHandler = (data) => {
        //console.log("data", data);

        aboutMutationHandler({
            variables: {
                id: ConsumerDetails?.me?.consumers?.id,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                bKashAcc: data.bKashAcc,
                dateOfBirth: dateValue ? moment(dateValue).format("YYYY-MM-DD") : ConsumerDetails?.me?.consumers?.dateOfBirth,
                nidNumber: data.nid,
                religion: data.religion ? data.religion : religion,
                gender: data.gender ? data.gender : gender,
                country: countryId ? countryId : country,
                callingCode: data.callingCode ? data.callingCode : callingCode,
                spouseName: data.spouseName
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
                reset({})
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

        if (!aboutLoading && !aboutError) {
            //router.push("/admin-dashboard/inventory/category");
        } else {
            //alert(vatUpdateError);
        }
    };


    return (
        <Box>
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
                    About updated successfully!
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
                    About not updated!
                </Alert>
            </Box>
            <Box >
                <form onSubmit={handleSubmit(aboutSubmitHandler)}>

            
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="First Name"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.user?.firstName}
                            name="firstName"
                            {...register("firstName")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Last Name"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.user?.lastName}
                            name="lastName"
                            {...register("lastName")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            sx={{ background: '#F3F3F3' }}
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Username"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.username}
                            inputProps={
                                { readOnly: true }
                            }
                            name="username"
                            {...register("username")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            sx={{ background: '#F3F3F3' }}
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Email"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.user?.email}
                            inputProps={
                                { readOnly: true }
                            }
                            name="email"
                            {...register("email")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <Autocomplete
                                    id="size-small-outlined"
                                    size="small"
                                    options={ countries?.edges }
                                    getOptionLabel={(option) =>
                                        option ? option?.node?.callingCodes : ""
                                    }
                                    defaultValue={countries?.edges.find((country) => {
                                        return country.node.callingCodes === ConsumerDetails?.me?.consumers?.callingCode
                                    })}
                                    name="callingCode"
                                    onChange={(event, value) => setCountry(value?.node?.id)}
                                    renderInput={(params) => (
                                        <TextField
                                            // onChange={(e)=> setCountry(e.target.value)}
                                            {...register("callingCode")}
                                            {...params}
                                            label="Calling Code"
                                            placeholder="Select calling code "
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={8}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="fullWidth"
                                    label="Phone"
                                    InputLabelProps={{ style: { fontSize: 15 } }}
                                    defaultValue={ConsumerDetails?.me?.consumers?.phone}
                                    name="phone"
                                    {...register("phone")}
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Bkash Account"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.bKashAcc}
                            name="bKashAcc"
                            {...register("bKashAcc")}
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}
                        
                        >
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Date of Birth"
                                    value={dateValue ? moment(dateValue).format("YYYY-MM-DD") : ConsumerDetails?.me?.consumers?.dateOfBirth}
                                    //minDate={new Date('1900-01-01')}
                                    onChange={(newValue) => {
                                        setDateValue(newValue);
                                    }}
                                    name="dob"
                                    renderInput={(params) => <TextField
                                        {...params}
                                        {...register("dob")}
                                    />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="NID Number"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.nidNumber}
                            name="nid"
                            {...register("nid")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={genderList}
                            getOptionLabel={(option) => option.type}
                            //defaultValue={genderList[0]}
                            defaultValue={genderList.find((gender) => {
                                return gender.type.toLowerCase() === ConsumerDetails?.me?.consumers?.gender.toLowerCase()
                            })}
                            name="gender"
                            renderInput={(params) => (
                                <TextField
                                    // onChange={(e)=> setReligion(e.target.value)}
                                    {...register("gender")}
                                    {...params}
                                    variant="outlined"
                                    label="Select Gender *"
                                    placeholder="Select Gender *"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={religionList}
                            getOptionLabel={(option) => option.name}
                            defaultValue={religionList.find((religion) =>
                                religion.name === ConsumerDetails?.me?.consumers?.religion
                            )}
                            // value={gender}
                            name="religion"
                            renderInput={(params) => (
                                <TextField

                                    // onChange={(e)=> setReligion(e.target.value)}
                                    {...register("religion")}
                                    {...params}
                                    variant="outlined"
                                    label="Select Religion *"
                                    placeholder="Select Religion *"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={countries?.edges }
                            getOptionLabel={(option) =>
                                option ? option?.node?.name : ""
                            }
                            defaultValue={countries?.edges.find((country) => {
                                return country.node.name === ConsumerDetails?.me?.consumers?.country?.name
                            }) }
                            name="country"
                            onChange={(event, value) => setCountryId(value?.node?.id)}
                            renderInput={(params) => (
                                <TextField
                                    // onChange={(e)=> setCountry(e.target.value)}
                                    {...register("country")}
                                    {...params}
                                    label="Select Country *"
                                    placeholder="Select Country *"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>

                        <TextField
                            fullWidth
                            size="small"
                            id="fullWidth"
                            label="Spouse Name"
                            InputLabelProps={{ style: { fontSize: 15 } }}
                            defaultValue={ConsumerDetails?.me?.consumers?.spouseName}
                            name="spouseName"
                            {...register("spouseName")}
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
                            Update About
                        </Button>
                    </Grid>

                </Grid>
                </form>
            </Box>
        </Box>
    )
}

export default About

const genderList = [{ type: "Male" }, { type: "Female" }, { type: "Others" }];
const religionList = [
  { name: "Islam" },
  { name: "Hinduism" },
  { name: "Christianity" },
  { name: "Buddhism" },
  { name: "Jainism" },
  { name: "Others" },
];
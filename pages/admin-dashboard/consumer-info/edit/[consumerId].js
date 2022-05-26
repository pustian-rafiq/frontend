import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import client from "../../../../apolloClient/configuration/apolloConfig";
import { GET_COUNTRIES } from "../../../../apolloClient/queries/allCountryQuery";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import getCookie from "../../../../utils/getCookie";
import { Typography } from "@mui/material";
import getCurrentUser from "../../../../utils/getCurrentUser";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import withAdminAuth from '../../../../components/Dashboard/PrivateRoute/withAdminAuth';
import useMasterConsumerDetails from "../../../../apolloClient/queries/consumer/EditMasterConsumer";
import PersonalInfo from "../../../../components/Dashboard/AdminDashboard/ConsumerInfo/PersonalInfo";
import ParentsInfo from "../../../../components/Dashboard/AdminDashboard/ConsumerInfo/ParentsInfo";


const Input = styled("input")({
  display: "none",
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const EditMasterConsumer = ({ token, countries }) => {
  const [expanded, setExpanded] = React.useState('panel1');
  const router = useRouter();
  const { consumerId } = router.query;
  const { data: consumerData, loading: masterConsumerLoading } =
    useMasterConsumerDetails(consumerId);
  const { register, handleSubmit, reset } = useForm();

  console.log("Master::", consumerData)
  // Image Preview code
  const [imagePreview, setImagePreview] = useState({ file: null });
  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  if (masterConsumerLoading) {
    return <div>Loading data....</div>;
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Typography sx={{
        fontSize: { xs: '16px', md: '25px', lg: '30px' },
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6C757D',
      }} >
        Edit Consumers Informations
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Personal Informations */}

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Personal Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <PersonalInfo consumerData={consumerData} countries={countries} token={token} />
        </AccordionDetails>
      </Accordion>
      {/* Parents Informations */}

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Parents Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ParentsInfo consumerData={consumerData} token={token} />
        </AccordionDetails>
      </Accordion>

      {/* Bio Informations */}

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Bio Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Bio"
                  defaultValue={consumerData?.consumer?.bio}
                  {...register("bio")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={bloodGroup}
                  getOptionLabel={(option) => option.name}
                  // defaultValue={bloodGroup[0]}
                  defaultValue={bloodGroup.find(
                    (v) => v.name === consumerData?.consumer?.bloodGroup
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Blood Group"
                      placeholder="Select Blood Group"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Height"
                  defaultValue={consumerData?.consumer?.height}
                  {...register("height")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Weight"
                  defaultValue={consumerData?.consumer?.weight}
                  {...register("weight")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Hobby"
                  defaultValue={consumerData?.consumer?.hobby}
                  {...register("hobby")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={maritalStatus}
                  getOptionLabel={(option) => option.status}
                  // defaultValue={maritalStatus[0]}
                  defaultValue={maritalStatus.find(
                    (v) =>
                      v.status === consumerData?.consumer?.maritalStatus
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Marital Status"
                      placeholder="Select Marital Status"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Languages"
                  defaultValue={consumerData?.consumer?.languages}
                  {...register("languages")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="About tour"
                  defaultValue={consumerData?.consumer?.aboutTour}
                  {...register("aboutTour")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  label="About family members"
                  id="fullWidth"
                  defaultValue={
                    consumerData?.consumer?.aboutFamilyMembers
                  }
                  {...register("aboutFamilyMembers")}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Designation and service organization"
                  defaultValue={
                    consumerData?.consumer
                      ?.designationAndServiceOrganization
                  }
                  {...register("designationAndServiceOrganization")}
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
        </AccordionDetails>
      </Accordion>
      {/* Educational Informations */}
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Educational Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Primary name and session"
                  defaultValue={
                    consumerData?.consumer?.primaryNameAndSession
                  }
                  {...register("primaryNameAndSession")}
                />
              </Grid>
              <Grid item xs={12} md={6} >
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Highschool name and session"
                  defaultValue={
                    consumerData?.consumer?.highschoolNameAndSession
                  }
                  {...register("highschoolNameAndSession")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="College name and session"
                  defaultValue={
                    consumerData?.consumer?.collegeNameAndSession
                  }
                  {...register("collegeNameAndSession")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="University name and session"
                  defaultValue={
                    consumerData?.consumer?.universityNameAndSession
                  }
                  {...register("universityNameAndSession")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  label="Phd name and session"
                  id="fullWidth"
                  defaultValue={
                    consumerData?.consumer?.phdNameAndSession
                  }
                  {...register("phdNameAndSession")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  id="fullWidth"
                  label="Others name and session"
                  defaultValue={
                    consumerData?.consumer?.othersNameAndSession
                  }
                  {...register("othersNameAndSession")}
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
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}
export default withAdminAuth(EditMasterConsumer)
export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({ query: GET_COUNTRIES });

  if (getSessionCookie === null || !getUser || !getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      countries: data.countries,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};


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
const religionList = [
  { name: "Islam" },
  { name: "Hinduism" },
  { name: "Christianity" },
  { name: "Buddhism" },
  { name: "Jainism" },
  { name: "Others" },
];
const genderList = [{ type: "Male" }, { type: "Female" }, { type: "Others" }];

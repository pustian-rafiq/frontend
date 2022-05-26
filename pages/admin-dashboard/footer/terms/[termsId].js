import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import useUpdateTerms from "../../../../apolloClient/mutation/termsConditions/updateterms";
import dynamic from "next/dynamic";
import useSingleTerms from "../../../../apolloClient/queries/termsCondition/singleterms";

const CKEditor = dynamic(
  import(
    "../../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor.js"
  ),
  {
    ssr: false,
  }
);



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const editTerms = ({ token, currentUser }) => {
   const [ckData, setCkData] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const { termsId } = router.query;


  const {data:termsdata,loading:termsloading,error:termserror}=useSingleTerms(termsId)
    
 const { termConditionCreateOrUpdate } = useUpdateTerms();

 console.log(ckData);
useEffect(()=>{
setCkData(termsdata?.termCondition?.description)
},[termsdata]) 

 const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 
  if (termsloading) {
    return <p>Please wait..</p>;
  }

  
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleterms =(data)=>{
 const formData = new FormData(); 
  termConditionCreateOrUpdate({
      variables: {
        id:termsId,
       description:ckData
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: () => {
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
          router.push("/admin-dashboard/footer/terms/");
        }, 3000);
      },
      onError: (err) => {
        alert(err);
      },
    });
  }

  

  return (
    <Box>
     
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully updated terms !!
        </Alert>
      </Snackbar>

    <Paper sx={{ p: 3 }}>
      <Typography
        sx={{
          color: "#6c757d",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 400,
        }}
      >
        Terms and Conditions
        
   
      </Typography>
      <Box sx={{ m: 3 }}>
        <form onSubmit={handleSubmit(handleterms)} >
        <Grid item xs={12} sm={12}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
            Title
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            
            {/* <textarea
              parse('')
              cols="15"
              rows={10}
              name="description"
              {...register("description", {
                required: true,
              })}

            />
              */}

              <CKEditor ckData={ckData}  setCkData={setCkData} />
          </FormControl>
        </Grid>
            <Box sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" >Save</Button>
      </Box>
         </form>
      </Box>
  
    </Paper>
  </Box>
  );
};

export default withAdminAuth(editTerms);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));


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
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};

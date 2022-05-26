import { Alert, Box, Button, InputLabel, Paper, Snackbar, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import useCreateTerms from "../../../../apolloClient/mutation/termsConditions/addterms.js";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth.js";
import getCookie from "../../../../utils/getCookie.js";
import getCurrentUser from "../../../../utils/getCurrentUser.js";

const CKEditor = dynamic(
  import(
    "../../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor.js"
  ),
  {
    ssr: false,
  }
);

const addTerms = ({ token, currentUser }) => {
  const [ckData, setCkData] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

   const router =useRouter();
  //alert show when successfully added data 

const { termConditionCreateOrUpdate } =useCreateTerms()
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };


  // handle to save data
  const handleterms=()=>{
   
    termConditionCreateOrUpdate({
      variables: {
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
  };

  
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
          Successfully Added terms !!
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
        <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
          Description of Terms and Conditions
        </InputLabel>
        <CKEditor ckData={ckData} setCkData={setCkData} />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={handleterms}>Save</Button>
      </Box>
    </Paper>
  </Box>
  );
};

export default withAdminAuth(addTerms);

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

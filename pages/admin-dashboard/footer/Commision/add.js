import { Alert, Box, Button, InputLabel, Paper, Snackbar, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useMarketingPolicy from "../../../../apolloClient/mutation/marketingPolicy/marketingPolicyCreate.js";

import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth.js";
import getCookie from "../../../../utils/getCookie.js";
import getCurrentUser from "../../../../utils/getCurrentUser.js";

import contacts from '../../../../styles/contact.module.css'
// const CKEditor = dynamic(
//   import(
//     "../../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor.js"
//   ),
//   {
//     ssr: false,
//   }
// );

const CommisionAdd = ({ token, currentUser }) => {
//   const [ckData, setCkData] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const { register, handleSubmit } = useForm();
   const router =useRouter();
  //alert show when successfully added data 

const { marketingPolicyCreateOrUpdate } =useMarketingPolicy()
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };



const handleCommision = (data) => {
  

    marketingPolicyCreateOrUpdate({
      variables:{
         ...data,
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
          router.push("/admin-dashboard/footer/Commision/")
        }, 3000);
      },
      onError: (err) => {
        alert(err);
      },

      
    })

document.getElementById('title').value=''



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
          Successfully Added Commision !!
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
        Marketing policy
      </Typography>
    
                <form  onSubmit={handleSubmit(handleCommision)}>
               
                    <Box>
                        <label className={contacts.input_name}>Title : </label><br/>
                        <input 
                        type="text" 
                        placeholder="commision title" 
                        className={contacts.input_style} 
                        name="user_title"
                        id="title"
                        {...register("title")}
                        
                        ></input>
                    </Box>
                                             
                         <br/>

                        <button className={contacts.submit} type="submit" value="Send" >Submit</button>
                                      
                 </form>
    </Paper>
  </Box>
  );
};

export default withAdminAuth(CommisionAdd);

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

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
import updatepolicy from "../../../../apolloClient/mutation/marketingPolicy/marketingPolicyUpdate";
import contacts from '../../../../styles/contact.module.css'
import useSinglePolicy from "../../../../apolloClient/queries/marketingPolicy/singlepolicy";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const editpolicy = ({ token, currentUser }) => {
//    const [ckData, setCkData] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const { policyid } = router.query;


  const {data:policydata,loading:policyloading,error:policyerror}=useSinglePolicy(policyid)
    
 const { marketingPolicyCreateOrUpdate } = updatepolicy();


 const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 
  if (policyloading) {
    return <p>Please wait..</p>;
  }

  
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handlepolicy =(data)=>{
 const formData = new FormData(); 
  marketingPolicyCreateOrUpdate({
      variables: {
          ...data,
        id:policyid,

    //    description:description,
    //    title:title
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
          router.push("/admin-dashboard/footer/Marketing_Policy");
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
          Successfully updated policy !!
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
       Marketing policys 
        
   
      </Typography>
      <Box sx={{ m: 3 }}>
          <form  onSubmit={handleSubmit(handlepolicy)}>
               
                    <Box>
                        <label className={contacts.input_name}>Tile : </label><br/>
                        <input 
                        type="text" 
                        defaultValue={policydata?.marketingPolicy?.title} 
                        className={contacts.input_style} 
                        name="user_title"
                        id="title"
                        {...register("title")}
                        
                        ></input>
                    </Box>
                  
                        <Box>
                            <label className={contacts.input_name}>Description : </label><br/>
                            <textarea 
                           
                            className={contacts.input_style}
                            defaultValue={policydata?.marketingPolicy?.description}
                            name="description"
                            id="description"
                            rows="7"
                            {...register("description")}
                            ></textarea>
                        </Box>                           
                         <br/>

                        <button className={contacts.submit} type="submit" value="Send" >Submit</button>
                                      
                 </form>
      </Box>
  
    </Paper>
  </Box>
  );
};

export default withAdminAuth(editpolicy);

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

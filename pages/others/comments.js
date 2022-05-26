import { Alert, Box, Container, Grid, InputLabel, Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import contacts from '../../styles/contact.module.css'
import Title from "../../components/Header/Title";
import { useForm } from "react-hook-form";
import useCommentsMutation from "../../apolloClient/mutation/comments/comments";
import getCookie from "../../utils/getCookie";
import getCurrentUser from "../../utils/getCurrentUser";
import { useRouter } from 'next/router'
const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgb(4 27 32 / 22%) 0%, #0a7c95 100%), 
     url(/images/comment.jpg)`,
    backgroundSize: "100%",
    backgroundRepeat:'no-repeat',
    height: {xs:'20vh',sm:'30vh',md:'40vh',lg:'50vh'},
    backgroundPosition:'center center'
}


const Comments = ({token}) => {

   const router =useRouter();
const { register, handleSubmit } = useForm();
 const [openAlert, setOpenAlert] = useState(false);
  // Image Preview code
  const [imagePreview, setImagePreview] = useState(null);

    // image handler
  const imageHandler = (e) => {
    // console.log("selected image ::", e.target.files);
    setImagePreview(e.target.files[0]);
  };
const [genderIcon, setGenderIcon] = useState("/images/profile-picture.jpg")
const {siteCommentCreateOrUpdate, loading, error, data }=useCommentsMutation();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

const onSubmit = data => {
  

    const formData = new FormData();

    for (let i in data) {
      if (i === "photo") {
        if (imagePreview !== null) {
          formData.append(i, imagePreview, imagePreview.name);
        } else {
          formData.append(i, "");
        }
      } else {
        formData.append(i, data[i]);
      }
    }

    siteCommentCreateOrUpdate({
      variables:{
          name:formData.get("name"),
          image:formData.get("photo"),
          comment:formData.get("comments"),
          designation:formData.get("designation"),
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
          router.push("/consumer-dashboard/info/galary");
        }, 3000);
      },
      onError: (err) => {
        alert(err);
      },
    })


document.getElementById('name').value=''
document.getElementById('photo').value=''
document.getElementById('message').value=''
document.getElementById('message').value=''
document.getElementById('designation').value=''

router.push('/');

}

    return (
        <Box>
            
            <Title>Comments</Title>

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
                      Comments Added successfully!
                    </Alert>
                  </Snackbar>

            <Box sx={backgroundStyle}  >
                
                
            </Box>

            <Container sx={{m:'20px auto',border:'1px solid #ddd',width:{md:'700px',lg:'900px',sm:'600px',xs:'300px'},p:'10px'}}>
                
 
                 <form  onSubmit={handleSubmit(onSubmit)}>
               
                    <div>
                        <label className={contacts.input_name}>Name : </label><br/>
                        <input 
                        type="text" 
                        placeholder="Enter your name" 
                        className={contacts.input_style} 
                        name="user_name"
                        id="name"
                        {...register("name")}
                        
                        ></input>
                    </div>

           {/* designation  */}

                     <div>
                        <label className={contacts.input_name}>Designation : </label><br/>
                        <input 
                        type="text" 
                        placeholder="designation" 
                        className={contacts.input_style} 
                        name="user_name"
                        id="designation"
                        {...register("designation")}
                        
                        ></input>
                    </div>
                  
                     <div>
                        <label className={contacts.input_name}>Image : </label><br/>
                 <Grid item >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100px",
                        borderRadius: "5px",
                        textAlign: "center",
                        backgroundColor: "var(--white)",
                      }}
                    >
                      <img
                        src={
                          imagePreview === null
                            ? genderIcon
                            : URL.createObjectURL(imagePreview)
                        }
                        height={100}
                        width={100}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        marginTop: "15px",
                        color: "white",
                      }}
                    >
                      <InputLabel
                        htmlFor="photo"
                        sx={{
                          backgroundColor: "#6c757d",
                          fontSize: "15px",
                          padding: "5px",
                          color: "white",
                          borderRadius: "5px",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "var(--primary)",
                          },
                        }}
                      >
                        Choose Photo
                      </InputLabel>

                      <input
                        type="file"
                        id="photo"
                        {...register("photo")}
                        hidden
                        onChange={(e) => imageHandler(e)}
                      />
                    </Box>
                  </Grid>
                       </div> 

                        <div>
                            <label className={contacts.input_name}>Comments : </label><br/>
                            <textarea 
                            placeholder="Your comments"
                            className={contacts.input_style}
                            name="message"
                            id="message"
                            rows="7"
                            {...register("comments")}
                            ></textarea>
                        </div>                           
                         <br/>

                        <button className={contacts.submit} type="submit" value="Send" >Submit</button>
                        
                      
                
                 </form>
               
            </Container>
            
        </Box>
    );
};

export default Comments;


export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";
  const getSessionCookie = getCookie(req, isServerSide);
 
  return {
    props: { 
      token: getSessionCookie,
       
    },
  };
};


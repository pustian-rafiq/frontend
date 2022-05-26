import { Box, Container } from "@mui/material";
import { useRef } from "react";
import contacts from '../../styles/contact.module.css'
import emailjs from '@emailjs/browser';
import { resetWarningCache } from "prop-types";
import Title from "../../components/Header/Title";


const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgb(4 27 32 / 22%) 0%, #0a7c95 100%), 
     url(./images/contact-banner.jpg)`,
    height:{xs:'20vh',sm:'30vh',md:'40vh',lg:'45vh'},
    backgroundRepeat:'no-repeat',
    backgroundSize:'100% 100%',
    backgroundPosition:'center',

}


const Contact = () => {

    const handlecontact =(e)=>{
        e.preventDefault();
      
    }

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_yrnh6qi', 'template_lhy5af6', form.current, 'Eh_SXNioqIdu3oDTH')
      .then((result) => {
         
      }, (error) => {
         
      });

      document.getElementById('name').value=''
      document.getElementById('email').value=''
      document.getElementById('subject').value=''
      document.getElementById('message').value=''
  };


    return (
        <Box>
            <Title>Contact us</Title>
            <Box sx={backgroundStyle}>
                
            </Box>

            <Container sx={{m:'20px auto',border:'1px solid #ddd',width:{md:'700px',lg:'900px',sm:'600px',xs:'300px'},p:'10px'}}>
                
 
                 <form ref={form} onSubmit={sendEmail}>
               
                    <div>
                        <label className={contacts.input_name}>Name : </label><br/>
                        <input 
                        type="text" 
                        placeholder="Enter your name" 
                        className={contacts.input_style} 
                        name="user_name"
                        id="name"
                        
                        ></input>
                    </div>
                  
                     <div>
                        <label className={contacts.input_name}>Email : </label><br/>
                        <input type="text" 
                            placeholder="Enter your email"
                            className={contacts.input_style}
                            name="user_email"
                            id="email"
                        ></input>
                       </div>

                        <div>
                            <label className={contacts.input_name}>subject : </label><br/>
                            <input type="text"
                            placeholder="Your subject"
                            className={contacts.input_style}
                            name="user_subject"
                            id="subject"
                            ></input>
                        </div>   

                           <div>
                            <label className={contacts.input_name}>Message : </label><br/>
                            <textarea 
                            placeholder="Your subject"
                            className={contacts.input_style}
                            name="message"
                            id="message"
                            rows="10"
                            ></textarea>
                        </div>   

                         {/* <div>
                            <label className={contacts.input_name}>Image files : </label><br/>
                            <input type="file"
                            placeholder="Your file"
                            className={contacts.input_style}
                            name="user_file"
                            id="image"
                            ></input>
                        </div> */}
                         
                         <br/>

                        <button className={contacts.submit} type="submit" value="Send" >Submit</button>
                        
                      
                
                 </form>
               
            </Container>
            
        </Box>
    );
};

export default Contact;




import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import useTermsConditions from "../../apolloClient/queries/termsCondition/termscondition";
import Title from "../../components/Header/Title";
var HTMLParser = require('node-html-parser');



const TermsCondition = ({termsconditions}) => {
  return (
    <>
      <Title>Terms And Condition</Title>

      <Container sx={{width:'85%',textAlign:'justify',my:'50px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography
              variant="body1"
              sx={{
                color: "rgb(0 138 185)",
                fontSize: {lg:'24px',md:'20px',sm:'18px',xs:'15px'}
              }}
              component="p"
            >
              Ehsan Marketing Terms and Conditions.
            </Typography>

{
  termsconditions?.data?.termConditions?.edges?.map(terms=> 
           <Typography
              variant="body1"
              gutterBottom
              sx={{
                lineHeight: "26px",
                 fontSize: "13px",
          
              }}
              component="div"
              key={terms?.node?.id}
            >
              <div dangerouslySetInnerHTML={{__html:terms?.node?.description}}>

              </div>
            {/* {root.toString()} */}
            
            </Typography>)
}  

          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const termsconditions = await useTermsConditions();
  return {
    props: {
 
     termsconditions:termsconditions
    },
  };
};

export default TermsCondition;

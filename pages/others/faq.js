import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../../components/Header/Title";
import { Box, Container } from "@mui/material";

const Faq = () => {
  return (
    <>
      <div style={{ margin: "20px 0px" }}>
        <Title>Frequently Asked Questions</Title>

        <Typography
          variant="h4"
          sx={{ 
             textAlign: "center", 
             overflow: "hidden",
             color: "#45b9e0",
             fontSize:{xs:'18px',sm:'20px',md:'22px',lg:'24px'}

            
            }}
        >
          Frequently asked question answer
        </Typography>
      </div>

      <Container sx={{ mb: "50px" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>How to increase references?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{backgroundColor:'#ddd',p:'15px'}} >
              Just share your referal link with your friend circle and family
              members.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>How To Create An account ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{backgroundColor:'#ddd',p:'15px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>All Cunsumer is an Root Consumer ? </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{backgroundColor:'#ddd',p:'15px'}}>
              No ,,, Some specific Consumer is s root consumer .
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Why We are the best ? </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{backgroundColor:'#ddd',p:'15px'}}>
              because we an honest man ,, and good developer
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export default Faq;


import { Typography, Box } from "@mui/material";

import Title from "../../components/Header/Title";


const Goals = () => {

  return (
    <>
      <Title>Our goals</Title>

      <Box sx={{ mb: "40px" }}>
        <Typography variant="h6"
          style={{
            textAlign: "center",
            fontSize:{lg:'24px',md:'20px',sm:'16px'}
          }}
        >
          Our Goals{" "}
        </Typography>

        <Typography
          variant="h5"
          component="div"
          sx={{
            p: "10px",
            textAlign: "center",
            fontSize:{lg:'20px',md:'18px',sm:'16px',xs:'14px'}
          }}
        >
          <span
            style={{ backgroundColor: "rgb(147, 248, 64)", padding: "5px" }}
          >
            {" "}
            To benefit every human being in the world financially even if it is
            minimal.
          </span>
        </Typography>
      </Box>

    </>
  );
};

export default Goals;


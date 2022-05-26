import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NotificationList from "../../../../components/Dashboard/AdminDashboard/NotificationList/NotificationList";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";

const consumers = [
  "Consumer",
  "Middle Consumer",
  "Prantik Consumer",
  "Daily Ref Consumer",
  "Dist Ref Consumer",
  "Incentive Consumer",
  "Incentive Bronze Consumer",
  "Incentive Silver Consumer",
  "Incentive Gold Consumer",
  "Incentive Platinum Consumer",
  "Incentive Gem Consumer",
  "Incentive Pearl Consumer",
  "Incentive Diamond Consumer",
  "Incentive Ruby Consumer",
  "Incentive Emerald Consumer",
  "Incentive Crown Consumer",
  "Incentive Paradise Consumer",
];

const index = ({ token, currentUser }) => {
  const [notificationLevel, setNotificationLevel] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
    setNotificationLevel(event.target.value);
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#6C757D",
        }}
      >
        Write Notification
      </Typography>
      <Divider />
      <Paper
        sx={{ width: "100%", pb: 4, pt: 4, mt: 3 }}
        style={{ paddingRight: "15px", paddingLeft: "15px" }}
      >
        <Box sx={{ mt: 3 }}>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sm={6}>
              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                label="Title *"
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <TextField
                fullWidth
                size="small"
                id="outlined-select-currency"
                select
                value={notificationLevel}
                label="Select Notification Level*"
                onChange={handleChange}
                //helperText="Please select your currency"
              >
                {notificationList.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {/* </Box> */}
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              size="small"
              id="outlined-textarea"
              label="Description*"
              multiline
            />
          </Box>
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            color: "#6c757d",
            fontWeight: 700,
            fontSize: { sm: "1rem", sm: "1.2rem", md: "1.5rem" },
          }}
        >
          Choose Recipient
        </Typography>
        {consumers.map((consumer) => (
          <NotificationList consumer={consumer} />
        ))}
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button variant="contained" sx={{ mt: 2 }}>
            Send Notification
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default withAdminAuth(index);

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

const notificationList = [
  { name: "Success" },
  { name: "Info" },
  { name: "Warning" },
  { name: "Error" },
];

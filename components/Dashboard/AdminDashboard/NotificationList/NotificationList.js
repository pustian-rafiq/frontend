import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";

const NotificationList = ({ consumer }) => {
  const [selectDisabled, setSelectDisabled] = useState(true);
  const [textfieldDisabled, setTextfieldDisabled] = useState(true);

  const handleConsumerCheck = (e, id) => {
    if (e.target.checked && id === consumer) {
      setSelectDisabled(false);
    } else {
      setSelectDisabled(true);
      setTextfieldDisabled(true);
    }
  };

  const handleRecipientSelect = (e) => {
    if (!selectDisabled && e.target.value === "individual") {
      setTextfieldDisabled(false);
    } else {
      setTextfieldDisabled(true);
    }
  };

  return (
    <Box sx={{ my: 1 }}>
      <Paper sx={{ p: 2, display: "flex" }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id={consumer}
                    onChange={(e) => handleConsumerCheck(e, consumer)}
                  />
                }
                label={consumer}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              id="outlined-select-currency"
              select
              label="Notification Level*"
              defaultValue={"all"}
              onChange={handleRecipientSelect}
              disabled={selectDisabled}
            //helperText="Please select your currency"
            >

              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"individual"}>Individual</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <TextField
              fullWidth
              size="small"
              id="fullWidth"
              label="Name of field*"
              disabled={textfieldDisabled}
              placeholder="Type Individual Recipient Name"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NotificationList;

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

const AddOrUpdateTax = ({ action, countries }) => {
  return (
    <Box component="form" autoComplete="off">
      <Typography sx={{ fontSize: "30px", textAlign: "center" }}>
        {action} VAT
      </Typography>
      <Box sx={{ mb: 3 }}>
        <InputLabel
          sx={{ fontSize: "12px", fontWeight: 600, color: "#34395e" }}
        >
          Name of the Field*
        </InputLabel>
        <FormControl fullWidth sx={{ background: "#ffffff" }}>
          <OutlinedInput />
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <InputLabel
          sx={{ fontSize: "12px", fontWeight: 600, color: "#34395e" }}
        >
          Country*
        </InputLabel>
        <Autocomplete
           options={countries?.edges}
           getOptionLabel={(option) => option ? option?.node?.name : ''}
           defaultValue={countries.edges[18]}
          renderInput={(params) => (
            <TextField
              sx={{ background: "#ffffff" }}
              {...params}
              placeholder="Select Country*"
            />
          )}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <InputLabel
          sx={{ fontSize: "12px", fontWeight: 600, color: "#34395e" }}
        >
          Percentage amt*
        </InputLabel>
        <TextField
          fullWidth
          sx={{ background: "#ffffff" }}
          type={"number"}
          defaultValue={0}
        />
      </Box>
      <Button variant="contained">Save</Button>
    </Box>
  );
};

export default AddOrUpdateTax;

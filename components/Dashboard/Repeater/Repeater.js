import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Repeater = ({ inputList, setInputList }) => {
  //   console.log("inputList::", inputList);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { label: "", value: "" }]);
  };
  return (
    <Box>
      {inputList.map((x, i) => {
        return (
          <Box key={i}>
            <Grid container spacing={1} sx={{ alignItems: "center", mt: 2 }}>
              <Grid item sm={12} md={6}>
                <TextField
                  name="label"
                  label="Enter Label"
                  variant="outlined"
                  value={x.label}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  name="value"
                  label="Enter Value"
                  variant="outlined"
                  value={x.value}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Grid>
              <Grid item xs={12}>
                {inputList.length !== 1 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveClick(i)}
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </Grid>
            {inputList.length - 1 === i && (
              <Button
                sx={{ mt: 2, textTransform: "none", px: 6 }}
                variant="contained"
                onClick={handleAddClick}
              >
                Add More
              </Button>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Repeater;

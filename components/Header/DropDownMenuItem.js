import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Select } from "@mui/material";

export default function DropDownMenuItem({ children, data }) {
  const [name, setName] = React.useState("");
  console.log(children);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize: "10px", color: "#5a5a5a" }}
      >
        {children} <ExpandMoreIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >

      {
          data?.continents?.edges?.map(cname=>
          <MenuItem onClick={handleClose}>{cname?.node?.name}</MenuItem>
          

          )

        }
        
       
      </Menu> */}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        label="Continent"
        size="small"
        // onChange={handleChange}
      >
        {data?.continents?.edges?.map((cname) => (
          <MenuItem onClick={handleClose}>{cname?.node?.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";
import Image from "next/image";
// import youtube from "./images/videoblock.jpg";
import YouTubeIcon from "@mui/icons-material/YouTube";

import ImageListItemBar from "@mui/material/ImageListItemBar";
import videolist from "../../styles/video.module.css";
import Box from "@mui/material/Box";
import { style } from "@mui/system";
import { Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: -5,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Youtubevideo = ({video}) => {
  console.log('you tube videos :',video.link);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

const styling = {
  backgroundImage: "url('/images/videoblock.jpg')",
  width:"350px",
  height:"200px",
  backgroundSize:'cover',
  backgroundPosition:"center center"
}

  return (
    <Box 
    sx={{
    margin: {
      xs: '0 auto'
    },

  textAlign:{
    xs:'center'
  }
  }}
    
    >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          padding: "0px",
        }}
      >
        {/* <img
          src='/images/videoblock.jpg'
          alt="Picture of the author"
          width={400}
          height={200}
        /> */}

        <Box style={styling} className={videolist.mim}>

        <Box className={videolist.listtitle}>
          <YouTubeIcon sx={{mr:'5px'}} />
          <Typography variant="body1" className={videolist.text}>
              {video?.title}</Typography>  
        </Box>
      </Box>
  
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>

        <DialogContent sx={{ margin: "0 auto" }}>
          <iframe
            width="550"
            height="400"
            src={video?.link}
 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default Youtubevideo;

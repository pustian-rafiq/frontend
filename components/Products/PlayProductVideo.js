import * as React from "react";

// mui component
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// mui icons
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CancelIcon from "@mui/icons-material/Cancel";

const PlayProductVideo = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<OndemandVideoIcon />}
        onClick={handleClickOpen}
      >
        Play Product Video
      </Button>

      {/* modal  */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions id="responsive-dialog-title">
          <IconButton
            variant="contained"
            aria-label="delete"
            size="small"
            onClick={handleClose}
          >
            <CancelIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <iframe
            width="550"
            height="400"
            src="https://www.youtube.com/embed/pDuEd0FNbBw"
            title="Product Video item"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayProductVideo;
